import RangeModel from "../models/rangeForecast.js";

const GetAnalyzed = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log(userId);
    const data = await RangeModel.find({ userId });
    // console.log(data);
    res.status(200).json({ message: `Analyzed Data`, data });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default GetAnalyzed;
