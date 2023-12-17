import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { colorsArray } from "../utils/ColorsArray";

function Contact({
  username,
  isOnline,
  onClick,
  message,
  border = true,
  picture,
}) {
  const [color, setColor] = useState("");

  useEffect(() => {
    const int = parseInt(username.slice(0, 9).length, 10);
    const color = colorsArray[int];
    setColor(color);
  }, [username]);

  return (
    <div
      className={`${
        border && "border-b"
      } p-4 flex gap-2 hover:bg-loginRegister cursor-pointer`}
      onClick={onClick}
    >
      <Avatar
        picture={picture}
        color={color}
        username={username}
        isOnline={isOnline}
      />
      <div className="flex flex-col -mt-1">
        <p className="text-name text-lg">{username}</p>
        <p className="text-message">{message}</p>
      </div>
    </div>
  );
}

export default Contact;
