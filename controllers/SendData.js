import axios from "axios";

const SendData = async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId) {
      // Send userId to the Python Flask API
      const response = await axios.get(
        `https://pythonapi-qkbb.onrender.com/predict/${userId}`
      );

      // Handle the success response from Flask API
      res.status(200).json({
        message: `UserId ${userId} sent to Python API successfully.`,
        data: response.data, // Send back the response from the Flask API
      });
    } else {
      res.status(400).json({ message: "Bad Request: Missing userId" });
    }
  } catch (error) {
    console.error("Error in forwarding userId to Python API:", error);
    res.status(500).json({ message: "Server Error!", error: error.message });
  }
};
export default SendData;
