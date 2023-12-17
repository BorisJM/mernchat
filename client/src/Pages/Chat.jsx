import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessageText,
  setMessages,
  setFile,
  setUserLastMessage,
} from "../dataStorage/messages/messagesSlice";
import { userContext } from "../Context/UserContext";
import { LoadingContext } from "../Context/LoadingContext";
import Navbar from "../ui/NavBar";
import EmojiPicker from "emoji-picker-react";
import Contact from "../ui/Contact";
import axios from "axios";
import Message from "../ui/Message";
import { uniqBy } from "lodash";
import ShowSideBarBtn from "../ui/ShowSideBarBtn";
import VideoCallBtn from "../ui/VideoCallBtn";
import VoiceCallBtn from "../ui/VoiceCallBtn";
import Sidebar from "../ui/SideBar";
import SidebarUser from "../ui/SidebarUser";
import CallingUser from "../ui/CallingUser";
import RoomChat from "../ui/RoomChat";
import AgoraRTC from "agora-rtc-sdk-ng";

function Chat() {
  const dispatch = useDispatch();
  const { messageText } = useSelector((state) => state.messages);
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState([]);
  const [offlinePeople, setOfflinePeople] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userLastMessage, setUserLastMessage] = useState({});
  // const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const { id, username, setId, setUsername } = useContext(userContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const ref = useRef();
  const [isActiveCall, setIsActiveCall] = useState(false);
  const [roomId, setRoomId] = useState("main");
  const [token, setToken] = useState(null);
  const [audioTracks, setAudioTracks] = useState({
    localAudioTrack: null,
    remoteAudioTracks: {},
  });
  const [rtcClientGlobal, setRtcClientGlobal] = useState(null);
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
      setAudioTracks((v) => {
        return {
          ...v,
          remoteAudioTracks: {
            [user.uid]: user.audioTrack,
          },
        };
      });
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

    setOnlinePeople([...noDuplicates]);
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
      setUserLastMessage((msg) => ({ ...msg, ...allLastMessages }));
      setSelectedUser((user) => {
        if (message.sender === user.userId) {
          setMessages((prev) => [...prev, { ...message }]);
        }
        return user;
      });
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

  function handleCreateMessage(e) {
    e.preventDefault();
    console.log(file);
    const data = {
      receiver: selectedUser.userId,
      sender: id,
      text: messageText,
    };
    if (!messageText && !file) return;
    if (messageText && !file) {
      const newLastMessage = userLastMessage[data.receiver];
      const newLastMessagesObj = { ...userLastMessage };
      delete newLastMessagesObj[newLastMessage];
      newLastMessagesObj[data.receiver] = data;
      setUserLastMessage(newLastMessagesObj);
      ws.send(JSON.stringify(data));
      setMessageText("");
      setMessages((prev) => [...prev, { ...data, _id: Date.now() }]);
    } else {
      axios
        .post(
          "/api/messages/createMessageImage",
          { file },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          const newLastMessage = userLastMessage[data.receiver];
          const newLastMessagesObj = { ...userLastMessage };
          delete newLastMessagesObj[newLastMessage];
          newLastMessagesObj[data.receiver] = {
            receiver: selectedUser.userId,
            sender: id,
            text: "Picture 📷",
          };
          setUserLastMessage(newLastMessagesObj);
          ws.send(JSON.stringify({ ...data, image: res.data.message }));
          setMessageText("");
          setMessages((prev) => [
            ...prev,
            { ...data, image: res.data.message, _id: Date.now() },
          ]);
          setFile("");
        });
    }
  }

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
      setAllUsers(offlineArr.filter((u) => u.userId !== id));

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
    setOfflinePeople(offlinePeopleArray);
  }

  useEffect(() => {
    setShowSidebar(false);
    if (selectedUser) {
      axios
        .get("/api/messages/getMessages/" + selectedUser.userId)
        .then((res) => {
          setMessages(res.data.messages);
        });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (Object.keys(userLastMessage).length) return;
    const userMessages = {};
    const data = allUsers.forEach((u) => {
      setIsLoading(true);
      axios.get("/api/messages/getMessages/" + u.userId).then((res) => {
        if (!res.data.messages) return;
        else
          userMessages[u.userId] =
            res.data.messages[res.data.messages.length - 1];
      });
    });
    setIsLoading(false);
    setUserLastMessage(userMessages);
  }, [allUsers, messages]);

  function onEmojiClick(e) {
    setMessageText((message) => message + e.emoji);
  }

  const messagesWithoutDupes = uniqBy(messages, "_id");

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
        <div className="w-1/4 bg-sidebar flex flex-col gap-2">
          {onlinePeople.map((user) => (
            <Contact
              onClick={() => setSelectedUser(user)}
              picture={user.picture}
              username={user.username}
              isOnline={true}
              message={`${
                userLastMessage[user.userId]?.sender === id ? "You: " : ""
              }  ${
                userLastMessage[user.userId]?.text ||
                (userLastMessage[user.userId]?.image && "Picture 📷") ||
                ""
              }`}
              key={user.userId}
            />
          ))}
          {offlinePeople.map((user) => (
            <Contact
              picture={user.picture}
              onClick={() => setSelectedUser(user)}
              username={user.username}
              isOnline={false}
              message={`${
                userLastMessage[user.userId]?.sender === id ? "You: " : ""
              } ${
                userLastMessage[user.userId]?.text ||
                (userLastMessage[user.userId]?.image && "Picture 📷") ||
                ""
              }`}
              key={user.userId}
            />
          ))}
        </div>
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
                  user={selectedUser}
                  handleLeave={leaveRoom}
                  isPlaying={!isActiveCall ? true : false}
                >
                  <CallingUser
                    username={selectedUser.username}
                    picture={selectedUser.picture}
                  />
                </RoomChat>
              )}
              <div className="w-full flex justify-between self-start border-b border-r">
                <Contact
                  picture={selectedUser.picture}
                  border={false}
                  username={selectedUser.username}
                  isOnline={onlinePeople.find(
                    (u) => u.username === selectedUser.username
                  )}
                  message={
                    onlinePeople.find(
                      (u) => u.username === selectedUser.username
                    )
                      ? "Is Active"
                      : "Is Offline"
                  }
                  key={selectedUser.userId}
                />
                <div className="flex gap-6 pr-4">
                  <VoiceCallBtn
                    handleClick={() => {
                      setShowRoom(true);
                      initRnc();
                    }}
                  />
                  <VideoCallBtn />
                  <ShowSideBarBtn
                    handleClick={() => setShowSidebar((bol) => !bol)}
                  />
                </div>
              </div>
              <div className="h-3/4 flex flex-col gap-4 overflow-y-scroll w-full p-3">
                {messagesWithoutDupes.map((m) => (
                  <Message
                    onLoad={() => {
                      if (!imageLoaded) setImageLoaded(true);
                    }}
                    image={m.image}
                    key={m._id}
                    text={m.text}
                    side={
                      m.receiver === selectedUser.userId
                        ? "text-right"
                        : "text-left"
                    }
                    bg={
                      m.receiver === selectedUser.userId
                        ? "bg-blue-400"
                        : "bg-zinc-700"
                    }
                    selfSide={
                      m.receiver === selectedUser.userId
                        ? "self-end"
                        : "self-start"
                    }
                  />
                ))}
                {/* Scroll to the bottom */}
                <div ref={ref}></div>
              </div>
              <form
                className="w-full flex justify-center relative gap-5 py-3 px-4 mt-3 border-t "
                onSubmit={handleCreateMessage}
              >
                <input
                  type="file"
                  name="file"
                  className="hidden"
                  id="file__input"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label
                  htmlFor="file__input"
                  className="hover:cursor-pointer flex justify-center items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </label>

                <input
                  onChange={(e) => dispatch(setMessageText(e.target.value))}
                  value={messageText}
                  placeholder="Aa"
                  type="text"
                  className="p-3 focus:outline-none rounded-full bg-slate-100 w-2/3"
                />
                {showEmojiPicker && (
                  <div className="emoji-menu absolute bottom-0 right-6 -translate-x-3/4 ">
                    <EmojiPicker
                      onEmojiClick={onEmojiClick}
                      height={350}
                      width={300}
                    />
                  </div>
                )}
                <button
                  type="button"
                  className="emoji-btn"
                  onClick={() => setShowEmojiPicker((bool) => !bool)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                </button>
              </form>
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
