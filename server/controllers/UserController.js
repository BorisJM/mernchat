const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const sharp = require("sharp");

// Creating multer storage
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

exports.uploadUserPhoto = upload.single("file");

exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();
  const { name, email } = req.body;
  req.file.filename = `avatar-${req.userId}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(250, 250)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/profile-pictures/${req.file.filename}`);

  const user = await User.findByIdAndUpdate(req.userId, {
    picture: req.file.filename,
  });
  if (!name && !email) {
    res.status(200).json({ message: "Picture was changed successfully" });
  }
  if (name || email) return next();
};

function signCookie(user, res) {
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res
    .cookie("token", token, {
      sameSite: "none",
      secure: true,
    })
    .status(201)
    .json({ data: user });
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(500)
        .json({ message: "User with that email don't exist" });
    //   if we user exists
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return signCookie(user, res);
    }
    return res.status(401).json({ message: "Wrong password" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { email, username, password, passwordConfirm } = req.body;
  try {
    if (!email || !username || !password || !passwordConfirm)
      return res.status(500).json({ message: "Please provide all the data" });

    const user = await User.create({
      email,
      username,
      password,
      passwordConfirm,
    });

    signCookie(user, res);
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(500)
        .json({ message: "User with that email already exist" });
    const errorsFields = ["password", "username", "email", "passwordConfirm"];
    let errorName;
    errorsFields.forEach((err) =>
      Object.keys(error.errors).includes(err) ? (errorName = err) : null
    );
    res.status(500).json({ error: error.errors[errorName] });
  }
};

exports.getUser = async (req, res) => {
  // const token = req.cookies?.token;

  // if (token) {
  //   const { username, userId } = jwt.verify(token, process.env.JWT_SECRET);
  //   if (!username && !userId)
  //     return res.status(401).json({ message: "Invalid token" });
  //   else return res.status(200).json({ username, userId });
  // } else {
  //   return res.status(401).json({ message: "You are not authorized" });
  // }
  const user = await User.findOne({ _id: req.userId });

  return res.status(200).json({
    username: req.username,
    userId: req.userId,
    picture: user.picture,
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id username picture");

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Could not get users. Try again later..." });
  }
};

exports.Logout = async (req, res) => {
  try {
    return res
      .cookie("token", "", { sameSite: "none", secure: true })
      .json({ message: "ok" })
      .status(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.ChangeSettings = async (req, res) => {
  try {
    const { newName: username, newEmail: email } = req.body;
    const data = { username, email };
    const finalData = Object.entries(data)
      .filter(([key, value]) => value !== undefined)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    const updatedUser = await User.findByIdAndUpdate(req.userId, finalData, {
      new: true,
      runValidators: true,
    });

    signCookie(updatedUser, res);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.ChangePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findById(req.userId);
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid)
      return res.status(500).json({ message: "Current password is not valid" });

    const isNewValid = newPassword === confirmPassword;
    if (!isNewValid)
      return res
        .status(500)
        .json({ message: "Passwords should be identical!" });

    user.password = newPassword;
    user.passwordConfirm = confirmPassword;
    await user.save();
    res.status(200).json({ message: "Password was updated successfully!" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
