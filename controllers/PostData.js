import BatteryModel from "../models/Battries.js";

const PostData = async (req, res) => {
  try {
    const { userId, fullRange, current_range, current_percentage } = req.body;

    // Ensure that all values are available and valid
    if (!userId || !fullRange || !current_range || !current_percentage) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Ensure all values are numbers and greater than zero
    if (
      isNaN(fullRange) ||
      isNaN(current_range) ||
      isNaN(current_percentage) ||
      fullRange <= 0 ||
      current_range <= 0 ||
      current_percentage <= 0
    ) {
      return res
        .status(400)
        .json({ message: "All values must be positive numbers" });
    }

    // Calculate the current 100% range
    const current_miles = (current_range / current_percentage) * 100;

    // Calculate the current battery health as a percentage of the original full range
    const current_battery_health = (current_miles / fullRange) * 100;

    // Calculate how many miles have been lost
    const lost_miles = fullRange - current_miles;

    // Calculate the lost percentage
    const lost_percentage = 100 - current_battery_health;

    // Create new battery data entry
    const newData = new BatteryModel({
      userId,
      fullRange,
      current_miles,
      current_battery_health,
      lost_miles,
      lost_percentage,
    });

    // Save the new data to the database
    await newData.save();

    // Send response to the client
    res.status(201).json({ message: "Data submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export default PostData;
