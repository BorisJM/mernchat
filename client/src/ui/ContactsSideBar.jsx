import { useDispatch, useSelector } from "react-redux";
import Contact from "./Contact";
import { setSelectedUser } from "../dataStorage/users/usersSlice";

function ContactsSideBar({ id, selectedUserRef }) {
  const { selectedUser, onlinePeople, offlinePeople } = useSelector(
    (state) => state.users
  );
  const { userLastMessage } = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  return (
    <div className="w-1/4 bg-sidebar flex flex-col gap-2">
      {onlinePeople.map((user) => (
        <Contact
          onClick={() => {
            dispatch(setSelectedUser(user));
            selectedUserRef.current = user;
          }}
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
          onClick={() => {
            dispatch(setSelectedUser(user));
            selectedUserRef.current = user;
          }}
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
  );
}

export default ContactsSideBar;
