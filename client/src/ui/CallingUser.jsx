import ProfilePicture from "./ProfilePicture";
import { colorsArray } from "../utils/ColorsArray";
import { useEffect, useState } from "react";

function CallingUser({ username, picture }) {
  const [color, setColor] = useState("");
  useEffect(() => {
    const int = parseInt(username.slice(0, 9).length, 10);
    const color = colorsArray[int];
    setColor(color);
  }, [username]);

  return (
    <div className="flex flex-col gap-2 items-center">
      <ProfilePicture
        selected={true}
        picture={picture}
        username={username}
        color={color}
        size="w-36 h-36"
      />
      <span className="text-white text-3xl">{username}</span>
      <span className="text-gray-400 text-lg">Calling...</span>
    </div>
  );
}

export default CallingUser;
