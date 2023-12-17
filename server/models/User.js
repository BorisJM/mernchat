const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: (res) => `${res.value} is not a valid email`,
      },
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords are not identical!",
      },
    },
    picture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = "";
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
