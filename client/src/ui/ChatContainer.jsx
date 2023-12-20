import { uniqBy } from "lodash";
import { useSelector } from "react-redux";
import Message from "./Message";

function ChatContainer({ children, onLoad }) {
  const { selectedUser } = useSelector((state) => state.users);
  const { messages } = useSelector((state) => state.messages);

  const messagesWithoutDupes = uniqBy(messages, "_id");

  return (
    <div className="h-3/4 flex flex-col gap-4 overflow-y-scroll w-full p-3">
      {messagesWithoutDupes.map((m) => (
        <Message
          onLoad={onLoad}
          image={m.image}
          key={m._id}
          text={m.text}
          side={m.receiver === selectedUser.userId ? "text-right" : "text-left"}
          bg={
            m.receiver === selectedUser.userId ? "bg-blue-400" : "bg-zinc-700"
          }
          selfSide={
            m.receiver === selectedUser.userId ? "self-end" : "self-start"
          }
        />
      ))}
      {children}
    </div>
  );
}

export default ChatContainer;
