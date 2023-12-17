const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const ws = require("ws");
const UserRouter = require("./routes/UserRoutes");
const MessagesRouter = require("./routes/MesaggeRoutes");
const VoiceCallRouter = require("./routes/VoiceCallRoutes");
const Messages = require("./models/Messages");
const multer = require("multer");
const User = require("./models/User");
const publicDir = require("path").join(__dirname, "/uploads");
require("dotenv").config();
mongoose.connect(
  process.env.DATABASE_URL.replace("password", process.env.DATABASE_PASSWORD)
);

const app = express();

app.use(express.static(publicDir));
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is listening to requests on port ${port}`);
});

const wss = new ws.WebSocketServer({ server });

wss.on("connection", (connection, req) => {
  function sendOnlinePeople() {
    [...wss.clients].forEach((client) => {
      client.send(
        JSON.stringify({
          online: [...wss.clients].map((c) => {
            if (c.username && c.userId) {
              return {
                username: c.username,
                userId: c.userId,
                picture: c.picture,
              };
            }
          }),
        })
      );
    });
  }

  // get user connection data and set it

  connection.isAlive = true;

  connection.timer = setInterval(() => {
    connection.ping();
    connection.deathTimer = setTimeout(() => {
      connection.isAlive = false;
      clearInterval(connection.timer);
      connection.terminate();
      sendOnlinePeople();
    }, 1000);
  }, 5000);

  connection.on("pong", () => {
    clearTimeout(connection.deathTimer);
  });

  const cookies = req.headers.cookie;
  if (cookies) {
    const token = cookies.split("token=")[1];
    if (!token) return;
    const { username, userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (username && userId) {
      connection.username = username;
      connection.userId = userId;
      getPicture(userId).then((res) => (connection.picture = res.picture));
    }
  }

  async function getPicture(userId) {
    const user = await User.findById(userId);
    return user;
  }

  connection.on("message", async (message) => {
    const messageData = JSON.parse(message.toString());
    const { receiver, sender, text, image: file } = messageData;

    if (!file) {
      const messageDoc = await Messages.create({
        sender,
        receiver,
        text,
      });

      const client = [...wss.clients].find(
        (c) => c.userId === messageData.receiver
      );
      if (client) {
        client.send(
          JSON.stringify({
            text,
            sender: connection.userId,
            receiver,
            _id: messageDoc._id,
          })
        );
      }
    } else {
      console.log(file);
      const messageDoc = await Messages.create({
        sender,
        receiver,
        text,
        image: file,
      });

      const client = [...wss.clients].find(
        (c) => c.userId === messageData.receiver
      );
      if (client) {
        client.send(
          JSON.stringify({
            text,
            sender: connection.userId,
            receiver,
            file,
            _id: messageDoc._id,
          })
        );
      }
    }
  });

  sendOnlinePeople();
});

app.use("/api/user", UserRouter);
app.use("/api/messages", MessagesRouter);
app.use("/api/voiceCall", VoiceCallRouter);
