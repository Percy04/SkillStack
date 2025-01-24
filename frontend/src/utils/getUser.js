import axios from "axios";

const getUser = async () => {
  let token = localStorage.getItem("token");

  if (!token) {
    // Create token for Google sign-in
    try {
      const response = await axios.get("http://localhost:5000/login/success", {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.token);
      token = response.data.token;
    } catch (error) {
      console.log("Not logged in: ", error);
      return null;
    }
  }

  // Fetch user data
  try {
    const response = await axios.get("http://localhost:5000/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.user; // Return user information
  } catch (error) {
    console.log(
      "Error accessing protected route: ",
      error.response?.data?.message
    );
    return null;
  }
};

export default getUser;

