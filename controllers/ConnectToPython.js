import axios from "axios";

const ConnectToPython = async (userId) => {
  try {
    const user = userId;
    console.log(`userId: ${user}`);

    // Make the POST request to the Flask API
    const response = await axios.post(
      `http://127.0.0.1:5000/predict/${user}`,
      {},
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    // Log the response message from the Python server
    console.log(response.data); // This will log the message returned by the Flask API
    console.log("Data has been passed to Python.");
  } catch (error) {
    // Log any error that occurs
    if (error.response) {
      // Server responded with a status code other than 2xx
      console.log(`Error: ${error.response.data}`);
    } else if (error.request) {
      // No response received
      console.log("No response from the Python server.");
    } else {
      // Some other error occurred during the request
      console.log(`Error: ${error.message}`);
    }
  }
};

export default ConnectToPython;
