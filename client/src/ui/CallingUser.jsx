import ProfilePicture from "./ProfilePicture";
import { colorsArray } from "../utils/ColorsArray";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function CallingUser({ children, playTimer }) {
  const [color, setColor] = useState("");
  const { selectedUser } = useSelector((state) => state.users);


  useEffect(() => {
    const int = parseInt(selectedUser.username.slice(0, 9).length, 10);
    const color = colorsArray[int];
    setColor(color);
  }, [selectedUser]);

  return (
    <div className="flex flex-col gap-2 items-center relative">
      <ProfilePicture selected={true} color={color} size="w-36 h-36" />
      <span className="text-white text-3xl">{selectedUser.username}</span>
      <div>{children}</div>
    </div>
  );
}

export default CallingUser;
