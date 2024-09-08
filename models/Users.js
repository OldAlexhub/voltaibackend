import mongoose from "mongoose";
import validator from "validator";

const UsersSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: `Email is incorrect`,
    },
  },
  password: { type: String, required: true, minlength: 8 },
  confirmPassword: {
    type: String,
    default: undefined,
    select: false,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords don't match",
    },
  },
  fullRange: { type: Number, required: true },
});

const UserModel = mongoose.model("users", UsersSchema);

export default UserModel;
