import jwt from "jsonwebtoken";
import UserModel from "../models/Users.js";

const protectRoute = async (req, res, next) => {
  try {
    let token;
    // Check for token in the headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "You are not logged in!" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await UserModel.findById(decoded.userId);
    if (!currentUser) {
      return res
        .status(401)
        .json({
          message: "The user belonging to this token no longer exists.",
        });
    }

    // If everything is okay, proceed to the next middleware
    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Your token has expired! Please log in again." });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ message: "Invalid token! Please log in again." });
    } else {
      res.status(500).json({ message: "Unauthorized!" });
    }
  }
};

export default protectRoute;
