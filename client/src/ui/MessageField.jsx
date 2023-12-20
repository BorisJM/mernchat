import { useDispatch, useSelector } from "react-redux";
import {
  setFile,
  setMessageText,
  setMessages,
  setUserLastMessage,
} from "../dataStorage/messages/messagesSlice";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";

function MessageField({ id, ws, showEmojiPicker, handleClick }) {
  const { selectedUser } = useSelector((state) => state.users);
  const { file, messageText, userLastMessage, messages } = useSelector(
    (state) => state.messages
  );
  const dispatch = useDispatch();

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
      dispatch(setUserLastMessage(newLastMessagesObj));
      ws.send(JSON.stringify(data));
      dispatch(setMessageText(""));
      dispatch(setMessages([...messages, { ...data, _id: Date.now() }]));
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
          dispatch(setUserLastMessage(newLastMessagesObj));
          ws.send(JSON.stringify({ ...data, image: res.data.message }));
          dispatch(setMessageText(""));
          dispatch(
            setMessages((prev) => [
              ...prev,
              { ...data, image: res.data.message, _id: Date.now() },
            ])
          );
          dispatch(setFile(""));
        });
    }
  }

  function onEmojiClick(e) {
    dispatch(setMessageText(messageText + e.emoji));
  }

  return (
    <form
      className="w-full flex justify-center relative gap-5 py-3 px-4 mt-3 border-t "
      onSubmit={handleCreateMessage}
    >
      <input
        type="file"
        name="file"
        className="hidden"
        id="file__input"
        onChange={(e) => dispatch(setFile(e.target.files[0]))}
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
          <EmojiPicker onEmojiClick={onEmojiClick} height={350} width={300} />
        </div>
      )}
      <button type="button" className="emoji-btn" onClick={handleClick}>
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
  );
}

export default MessageField;
