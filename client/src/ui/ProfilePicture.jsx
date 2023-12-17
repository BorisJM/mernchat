import { useContext } from "react";
import { userContext } from "../Context/UserContext";

function ProfilePicture({
  color,
  username,
  size = "w-12 h-12",
  selected = false,
  picture,
}) {
  const { userPicture } = useContext(userContext);

  if (!userPicture)
    return (
      <li
        className={`${color} flex items-center justify-center ${size} rounded-full`}
      >
        <span className="text-xl uppercase">{username[0]}</span>
      </li>
    );
  else
    return (
      <li className="flex">
        <img
          className={`${size} rounded-full`}
          src={`http://localhost:4000/uploads/profile-pictures/${
            !selected ? userPicture : picture
          }`}
          alt={`${username} picture`}
        />
      </li>
    );
}

export default ProfilePicture;
