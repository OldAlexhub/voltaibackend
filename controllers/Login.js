import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: `Invalid credentials` });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: `Invalid credentials` });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const range = user.fullRange;
    const user_ID = user._id;

    res
      .status(200)
      .json({ message: `Login successful`, token, range, user_ID });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Server Error!` });
  }
};

export default Login;
