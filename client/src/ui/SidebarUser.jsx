import { useEffect, useState } from "react";

function SidebarUser({ image, username, status }) {
  const [color, setColor] = useState("");
  const colorsArray = [
    "bg-slate-600",
    "bg-zinc-600",
    "bg-red-600",
    "bg-orange-600",
    "bg-amber-600",
    "bg-lime-600",
    "bg-green-600",
    "bg-teal-600",
    "bg-cyan-600",
    "bg-violet-600",
    "bg-pink-600",
  ];
  useEffect(() => {
    const int = parseInt(username.slice(0, 9).length, 10);
    const color = colorsArray[int];
    setColor(color);
  }, [username]);

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <button
        className={!image ? `${color} rounded-full h-24 w-24 relative` : ""}
      >
        {!image ? (
          <span className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 uppercase text-5xl">
            {username[0]}
          </span>
        ) : (
          <img
            className="w-24 rounded-full"
            src={`http://localhost:4000/uploads/profile-pictures/${image}`}
            alt="Picture of user"
          />
        )}
      </button>
      <h2 className="text-name text-lg font-semibold">{username}</h2>
      <span className="text-message">{status}</span>
    </div>
  );
}

export default SidebarUser;
