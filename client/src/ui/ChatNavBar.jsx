import { useSelector } from "react-redux";
import VoiceCallBtn from "./VoiceCallBtn";
import ShowSideBarBtn from "./ShowSideBarBtn";
import VideoCallBtn from "./VideoCallBtn";
import Contact from "./Contact";

function ChatNavBar({ handleClick, handleSidebar }) {
  const { selectedUser, onlinePeople } = useSelector((state) => state.users);

  return (
    <div className="w-full flex justify-between self-start border-b border-r">
      <Contact
        picture={selectedUser.picture}
        border={false}
        username={selectedUser.username}
        isOnline={onlinePeople.find(
          (u) => u.username === selectedUser.username
        )}
        message={
          onlinePeople.find((u) => u.username === selectedUser.username)
            ? "Is Active"
            : "Is Offline"
        }
        key={selectedUser.userId}
      />
      <div className="flex gap-6 pr-4">
        <VoiceCallBtn handleClick={handleClick} />
        <VideoCallBtn />
        <ShowSideBarBtn handleClick={handleSidebar} />
      </div>
    </div>
  );
}

export default ChatNavBar;
