import Header from "../components/Header";
import "../styles/pages/signup.css";
import axios from "axios";
import dotenv from "dotenv";

function Signup() {
  function handleCreateAcccount(formData) {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    const fullName = firstName + " " + lastName;
    console.log(fullName, email, password);

    //Make port number dynamic
    axios
      .post("http://localhost:5000/auth/register", {
        fullName,
        email,
        password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
 }

  return (
    <div className="signup-container">
      {/* <Header /> */}

      <div className="form-container">
        {/* Add floating reviews here */}
        <div className="form-left">
          <h1>slkfjd</h1>
        </div>

        <form action={handleCreateAcccount} className="form-right">
          <h1>Create an account</h1>
          <p id="login-link">
            Already have an account? <a href="#login">Log in</a>
          </p>

          <div className="input-section">
            <div className="input-name">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name"
                required
              />
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
              />
            </div>

            <div className="input-text">
              <input type="email" name="email" id="email" placeholder="Email" required/>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                required
              />
              <button>Create account</button>
            </div>
          </div>

          <h6>
            <span>Or register with</span>
          </h6>

          <button>Google</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
