const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Unauthorized!` });
    }

    // Call next() to proceed to the next middleware or route handler
    next();
  };
};

export default restrictTo;
