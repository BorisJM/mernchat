import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessageText,
  setMessages,
  setFile,
  setUserLastMessage,
  getMessages,
} from "../dataStorage/messages/messagesSlice";
import { userContext } from "../Context/UserContext";
import { LoadingContext } from "../Context/LoadingContext";
import Navbar from "../ui/NavBar";
import axios from "axios";
import Sidebar from "../ui/SideBar";
import SidebarUser from "../ui/SidebarUser";
import CallingUser from "../ui/CallingUser";
import RoomChat from "../ui/RoomChat";
import AgoraRTC from "agora-rtc-sdk-ng";
import ContactsSideBar from "../ui/ContactsSideBar";
import {
  setAllUsers,
  setOfflinePeople,
  setOnlinePeople,
} from "../dataStorage/users/usersSlice";
import ChatNavBar from "../ui/ChatNavBar";
import ChatContainer from "../ui/ChatContainer";
import MessageField from "../ui/MessageField";
import { setShowVolumeIndicator } from "../dataStorage/features/featuresSlice";

function Chat() {
  const [ws, setWs] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const { id, username, setId, setUsername } = useContext(userContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [isActiveCall, setIsActiveCall] = useState(false);
  const [roomId, setRoomId] = useState("main");
  const [token, setToken] = useState(null);
  const [rtcClientGlobal, setRtcClientGlobal] = useState(null);
  const [audioTracks, setAudioTracks] = useState({
    localAudioTrack: null,
    remoteAudioTracks: {},
  });
  const { messageText, messages, userLastMessage } = useSelector(
    (state) => state.messages
  );
  const { onlinePeople, offlinePeople, selectedUser, allUsers } = useSelector(
    (state) => state.users
  );

  const dispatch = useDispatch();
  const ref = useRef();
  const selectedUserRef = useRef(selectedUser);
  let rtcClient;

  // Agora Config
  const appId = import.meta.env.VITE_APP_ID;
  const rtcUid = Math.floor(Math.random() * 2032);
  async function initRnc() {
    rtcClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    setRtcClientGlobal(rtcClient);

    rtcClient.on("user-joined", handleUserJoined);
    rtcClient.on("user-published", handleUserPublished);
    rtcClient.on("user-left", handleUserLeft);

    await rtcClient.join(appId, roomId, token, rtcUid);
    const newAudioTrack = {
      remoteAudioTracks: {},
    };
    newAudioTrack.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    setAudioTracks(newAudioTrack);
    await rtcClient.publish(newAudioTrack.localAudioTrack);
    initVolumeIndicator();
  }

  useEffect(() => {
    async function PlayTrack() {
      if (audioTracks.localAudioTrack) {
        await rtcClientGlobal.publish(audioTracks.localAudioTrack);
      }
    }
    PlayTrack();
  }, [audioTracks, rtcClientGlobal]);

  async function handleUserJoined(user) {
    console.log("A NEW USER HAS JOINED:", user);
    setIsActiveCall(true);
  }

  async function handleUserPublished(user, mediaType) {
    await rtcClient.subscribe(user, mediaType);
    if (mediaType === "audio") {
      setAudioTracks((v) => ({
        ...v,
        remoteAudioTracks: {
          [user.uid]: user.audioTrack,
        },
      }));
      user.audioTrack.play();
    }
    setIsActiveCall(true);
  }

  async function handleUserLeft(user) {
    setAudioTracks((v) => ({
      localAudioTrack: v.localAudioTrack,
      remoteAudioTracks: {},
    }));
    setIsActiveCall(false);
  }

  function initVolumeIndicator() {
    AgoraRTC.setParameter("AUDIO_VOLUME_INDICATION_INTERVAL", 200);
    rtcClient.enableAudioVolumeIndicator();
    rtcClient.on("volume-indicator", (volumes) => {
      volumes.forEach((volume) => {
        try {
          if (volume.level >= 50 && volume.uid !== rtcUid) {
            dispatch(setShowVolumeIndicator(true));
          } else {
            dispatch(setShowVolumeIndicator(false));
          }
        } catch (error) {
          console.log(error);
        }
      });
    });
  }

  // Mute mic
  async function muteMic() {
    console.log(audioTracks.localAudioTrack.muted);
    if (audioTracks.localAudioTrack && !audioTracks.localAudioTrack.muted) {
      await audioTracks.localAudioTrack.setMuted(true);
    } else if (audioTracks.localAudioTrack.muted) {
      await audioTracks.localAudioTrack.setMuted(false);
    }
  }

  // leave room
  async function leaveRoom() {
    if (audioTracks.localAudioTrack) {
      await audioTracks.localAudioTrack.stop();
      await audioTracks.localAudioTrack.close();
    }
    rtcClientGlobal.unpublish();
    rtcClientGlobal.leave();
    setIsActiveCall(false);
    setShowRoom(false);
  }

  // Websocket connection
  useEffect(() => {
    connectToWs();
  }, [selectedUser, id]);

  function connectToWs() {
    const ws = new WebSocket("ws://localhost:4000");
    setWs(ws);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("close", () => {
      setTimeout(() => {
        console.log("Disconnected. Trying to reconnect.");
        connectToWs();
      }, 1000);
    });
  }

  function showOnlinePeople(people) {
    const idsArrOne = people.map((user) => (user.picture ? user : null));
    const idsArr = idsArrOne.filter((user) => user !== null);

    const noDuplicates = [
      ...new Map(idsArr.map((user) => [user?.userId, user])).values(),
    ].filter((user) => user?.userId !== id);

    dispatch(setOnlinePeople([...noDuplicates]));
  }
  function handleMessage(e) {
    const data = JSON.parse(e.data);

    if ("online" in data) {
      showOnlinePeople(data.online);
    } else if ("text" in data) {
      const message = data;
      if (data.file) {
        const file = message.file;
        message.image = file;
        delete message.file;
      }
      const lastMessage = {
        receiver: message.receiver,
        sender: message.sender,
        text: message.text,
      };
      const lastMessageObject = {};
      lastMessageObject[message.sender] = lastMessage;
      const allLastMessages = { ...userLastMessage };
      delete allLastMessages[lastMessage];
      allLastMessages[message.sender] = message.image
        ? {
            receiver: message.receiver,
            sender: message.sender,
            text: "Picture 📷",
          }
        : lastMessage;
      dispatch(setUserLastMessage(allLastMessages));

      if (message.sender === selectedUserRef.current.userId) {
        dispatch(setMessages({ payload: [{ ...message }], type: "receive" }));
      }
    }
  }

  // Logout function
  function handleLogout() {
    setIsLoading(true);
    axios.post("/api/user/logout").then(() => {
      setWs(null);
      setId(null);
      setUsername(null);
      setIsLoading(false);
    });
  }

  // Creating and sending message

  useEffect(() => {
    const div = ref.current;

    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, imageLoaded, setImageLoaded]);

  useEffect(() => {
    async function getUsers() {
      const { data } = await axios.get("/api/user/getAllUsers");
      const offlineArr = data.users.map((u) => ({
        userId: u._id,
        username: u.username,
        picture: u.picture,
      }));
      const users = offlineArr.filter((u) => u.userId !== id);
      dispatch(setAllUsers(users));
      ShowOfflinePeople(offlineArr);
    }
    getUsers();
  }, [onlinePeople, id]);

  function ShowOfflinePeople(users) {
    const offlinePeopleIds = users.map((u) => u.userId);
    const onlinePeopleIds = onlinePeople.map((u) => u.userId);
    const offlineUsers = offlinePeopleIds.filter(
      (id) => !onlinePeopleIds.includes(id)
    );
    const offlinePeopleArray = users
      .filter((u) => offlineUsers.includes(u.userId))
      .filter((u) => u.userId !== id);
    dispatch(setOfflinePeople(offlinePeopleArray));
  }

  useEffect(() => {
    setShowSidebar(false);
    if (selectedUser) {
      dispatch(
        getMessages({ type: "GET_MESSAGES" }, { user: selectedUser.userId })
      );
    }
  }, [selectedUser]);

  useEffect(() => {
    if (Object.keys(userLastMessage).length) return;
    dispatch(getMessages({ type: "GET_LAST_MESSAGES" }, { allUsers }));
  }, [allUsers, messages]);

  return (
    <div
      className="h-screen overflow-hidden"
      onClick={(e) => {
        if (e.target.closest(".emoji-btn") || e.target.closest(".emoji-menu"))
          return;
        else setShowEmojiPicker(false);
      }}
    >
      <Navbar username={username} handleLogout={handleLogout} />
      <div className="flex h-full">
        <ContactsSideBar id={id} selectedUserRef={selectedUserRef} />
        <div className="w-full flex flex-col items-center h-full bg-white  border-r">
          {!selectedUser && (
            <span className="text-name text-3xl align m-auto">
              Please pick a user to start a converstation!
            </span>
          )}
          {selectedUser && (
            <>
              {showRoom && (
                <RoomChat
                  handleMute={muteMic}
                  handleLeave={leaveRoom}
                  isPlaying={!isActiveCall ? true : false}
                />
              )}
              <ChatNavBar
                handleClick={() => {
                  setShowRoom(true);
                  initRnc();
                }}
                handleSidebar={() => {
                  setShowSidebar((bol) => !bol);
                }}
              />
              <ChatContainer
                onLoad={() => {
                  if (!imageLoaded) setImageLoaded(true);
                }}
              >
                {/* Scroll to the bottom */}
                <div ref={ref}></div>
              </ChatContainer>
              <MessageField
                id={id}
                ws={ws}
                showEmojiPicker={showEmojiPicker}
                handleClick={() => setShowEmojiPicker((bool) => !bool)}
              />
            </>
          )}
        </div>
        {showSidebar && (
          <Sidebar selectedUser={selectedUser}>
            <SidebarUser
              image={selectedUser?.picture}
              username={selectedUser?.username}
              status={
                onlinePeople.find((u) => u.username === selectedUser?.username)
                  ? "is Active"
                  : "is Offline"
              }
            />
          </Sidebar>
        )}
      </div>
    </div>
  );
}

export default Chat;
