import axios from "axios";

export const fetchData = async (url, params) => {
  try {
    const storedToken = localStorage.getItem("token").toString();
    const fetchedData = await axios.post(url, params, {
      headers: {
        token: storedToken,
      },
    });
    return fetchedData.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
