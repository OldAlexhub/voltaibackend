import axios from "axios";

const ProphetData = async (userId) => {
  try {
    console.log(`Sending userId to Prophet API: ${userId}`);

    // Make a POST request to the R-based API
    const response = await axios.post(
      "https://rprophetevapi.onrender.com/predict",
      {
        userId,
      }
    );

    if (response.status === 200) {
      console.log("Prophet data processed successfully.");
    } else {
      console.log(`Error: Prophet API returned status ${response.status}`);
    }
  } catch (error) {
    console.log("Error in ProphetData:", error);
  }
};

export default ProphetData;
