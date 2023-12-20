import { useContext } from "react";
import { userContext } from "../Context/UserContext";
import { useSelector } from "react-redux";

function ProfilePicture({ color, size = "w-12 h-12", selected = false }) {
  const { showVolumeIndicator } = useSelector((state) => state.features);
  const { userPicture, username } = useContext(userContext);
  const { selectedUser } = useSelector((state) => state.users);

  if (!userPicture || (selected && !selectedUser.picture))
    return (
      <li
        className={`${color} ${
          showVolumeIndicator
            ? "border-2 -m-0.5 border-solid border-green-500 rounded-full"
            : ""
        } flex items-center justify-center ${size} rounded-full`}
      >
        <span className="text-xl uppercase">
          {selectedUser?.username[0] || username[0]}
        </span>
      </li>
    );
  else
    return (
      <li
        className={`flex ${
          showVolumeIndicator
            ? "border-2 -m-0.5 border-solid border-green-500 rounded-full"
            : ""
        }`}
      >
        <img
          className={`${size} rounded-full`}
          src={`http://localhost:4000/uploads/profile-pictures/${
            !selected ? userPicture : selectedUser.picture
          }`}
          alt={`${selectedUser?.username} picture`}
        />
      </li>
    );
}

export default ProfilePicture;
