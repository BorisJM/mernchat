const jwt = require("jsonwebtoken");
const { generateToken04 } = require("../utils/zegoServerAssistant");

exports.protect = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (token) {
    const { username, userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (!username && !userId) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      req.username = username;
      req.userId = userId;
      return next();
    }
  } else {
    return res.status(401).json({ message: "You are not authorized" });
  }
};

exports.generateRoomToken = (req, res) => {
  const appID = +process.env.ZEGO_APP_ID;
  const secret = process.env.ZEGO_SERVER_SECRET;
  const { userId } = req.body;
  const effectiveTimeInSeconds = 3600;
  const token = generateToken04(
    appID,
    userId,
    secret,
    effectiveTimeInSeconds,
    ""
  );

  return res.status(201).json({ token });
};
