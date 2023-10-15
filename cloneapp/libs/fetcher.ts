import axios from "axios";

// Function to fetch data from the provided URL using Axios
const fetcher = async (url: string) => {
  try {
    // Send a GET request to the specified URL using Axios
    const response = await axios.get(url);

    // If the request is successful, return the response data
    return response.data;
  } catch (error) {
    // If there's an error (e.g., network error, 404 Not Found), handle it here
    // You can log the error, show a user-friendly message, or throw the error for the calling code to handle
    console.error("Error fetching data:", error);
    // You can throw the error to let the calling code handle it
    throw error;
  }
};

export default fetcher;
