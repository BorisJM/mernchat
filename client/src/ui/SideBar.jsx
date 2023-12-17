import axios from "axios";
import { useEffect, useState } from "react";
import SwiperGallery from "./SwiperGallery";

function Sidebar({ children, selectedUser }) {
  const [showGallery, setShowGallery] = useState(false);
  const [images, setImages] = useState([]);
  const [showSwiper, setShowSwiper] = useState(false);
  const { userId, picture } = selectedUser;

  useEffect(() => {
    axios.get("/api/messages/getMessages/" + userId).then((res) => {
      console.log(res);
      const filterImages = res.data.messages
        .map((u) => u.image)
        .filter((img) => img !== undefined);
      setImages(filterImages);
    });
  }, [showGallery]);

  return (
    <div className="w-1/4 bg-white flex flex-col gap-5 items-center p-3">
      {children}
      <ul className="flex justify-between w-full px-12">
        <li className="bg-zinc-700 rounded-full flex justify-center p-1.5">
          <button
            onClick={() => {
              setShowSwiper(true);
              setImages([picture]);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
        <li className="bg-zinc-700 rounded-full flex justify-center p-1.5">
          {" "}
          <button onClick={() => setShowGallery((bol) => !bol)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
        <li className="bg-zinc-700 rounded-full flex justify-center p-1.5">
          {" "}
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
      {showGallery && (
        <div className="grid grid-cols-3 gap-1">
          {images.map((img) => (
            <button
              key={Date.now() + img}
              className="overflow-hidden"
              onClick={() => setShowSwiper(true)}
            >
              <img
                className="hover:scale-125  transition-all duration-200"
                src={`http://localhost:4000/uploads/chat-images/${img}`}
                alt="photo from user"
              />
            </button>
          ))}
        </div>
      )}
      {showSwiper && (
        <SwiperGallery
          images={images}
          handleClick={() => setShowSwiper(false)}
        />
      )}
    </div>
  );
}

export default Sidebar;
