import mongoose from "mongoose";

const connectTodb = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log(`Connected to MongoDB successfully`);
  } catch (error) {
    console.log(`Failed to connect to MongoDB`);
  }
};

export default connectTodb;
