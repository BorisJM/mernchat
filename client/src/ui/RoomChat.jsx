import { useEffect, useState } from "react";
import useSound from "use-sound";
import calling from "../sounds/call.mp3";
import CallingUser from "./CallingUser";
import Timer from "./Timer";

function RoomChat({ children, isPlaying, handleLeave, handleMute }) {
  const [isMuted, setIsMuted] = useState(false);
  const [showCam, setShowCam] = useState(false);
  const [playSound, { stop }] = useSound(calling, {
    volume: 0.1,
  });

  useEffect(() => {
    if (isPlaying) {
      playSound();
    } else if (!isPlaying) {
      stop();
    }
  }, [playSound, isPlaying, stop]);

  return (
    <div className="absolute bg-black w-full h-full left-0 top-0 z-50 bg-opacity-95 py-4 flex flex-col items-center justify-between">
      <div></div>
      <div>
        <CallingUser>
          {!isPlaying ? (
            <Timer play={!isPlaying ? true : false} />
          ) : (
            <span className="text-gray-400 text-lg">Calling...</span>
          )}
        </CallingUser>
      </div>
      <ul className="flex gap-8">
        <li className="rounded-full p-3 flex bg-neutral-700">
          <button
            onClick={() => {
              handleMute();
              setIsMuted((bol) => !bol);
            }}
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                dataSlot="icon"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
              </svg>
            )}
          </button>
        </li>
        <li className="rounded-full p-3 flex bg-red-600">
          <button
            onClick={() => {
              stop();
              handleLeave();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
        <li className="rounded-full p-3 flex bg-neutral-700">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-6 h-6"
            >
              <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.5 17.69c0 .471-.202.86-.504 1.124l-4.746-4.746V7.939l2.69-2.689c.944-.945 2.56-.276 2.56 1.06v11.38zM15.75 7.5v5.068L7.682 4.5h5.068a3 3 0 013 3zM1.5 7.5c0-.782.3-1.494.79-2.028l12.846 12.846A2.995 2.995 0 0112.75 19.5H4.5a3 3 0 01-3-3v-9z" />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default RoomChat;
