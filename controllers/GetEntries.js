import BatteryModel from "../models/Battries.js";

const GetEntries = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log(userId);
    const data = await BatteryModel.find({ userId });
    // console.log(data);
    res.status(200).json({ message: `Fetched data`, data });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default GetEntries;
