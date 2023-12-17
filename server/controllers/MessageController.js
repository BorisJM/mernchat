const Messages = require("../models/Messages");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadMessagePhoto = upload.single("file");

exports.resizeMessageImage = async (req, res, next) => {
  req.file.filename = `message-${req.userId}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/chat-images/${req.file.filename}`);

  res.status(200).json({ message: req.file.filename });
};

exports.createMessage = async (req, res) => {
  try {
    const message = await Messages.create(req.body);
    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const messages = await Messages.find({
      receiver: { $in: [receiverId, req.userId] },
      sender: { $in: [receiverId, req.userId] },
    });

    if (!messages) return res.status(404).json("not found");
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
