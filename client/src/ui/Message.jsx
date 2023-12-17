function Message({ text, side, bg, selfSide, image, onLoad }) {
  return (
    <>
      <div
        className={`w-1/3 ${side} ${selfSide} ${
          text && image
            ? `flex flex-col gap-2 ${
                selfSide === "self-start" ? "items-start" : "items-end"
              }`
            : ""
        }`}
      >
        {text && (
          <span
            className={`${bg} text-gray-50 text-lg  rounded-full px-4 py-1`}
          >
            {text}
          </span>
        )}
        {image && (
          <div className={`${bg} w-[500px] h-[500px]`}>
            <img
              loading="lazy"
              onLoad={onLoad}
              alt={`image send by user ${image}`}
              src={`http://localhost:4000/uploads/chat-images/${image}`}
            />
          </div>
        )}
      </div>
    </>
  );
}
export default Message;
