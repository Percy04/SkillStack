import Header from "../components/Header";
// import "../styles/pages/signup.css";
import axios from "axios";

function Signup() {
  function handleCreateAcccount(formData) {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    const name = firstName + " " + lastName;

    //Make port number dynamic
    axios
      .post("http://localhost:5000/auth/register", {
        name,
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

  function signupWithGoogle() {
    window.open("http://localhost:5000/auth/google/callback", "_self");
  }

  return (
    <>
      <Header />
      <div className="signup-container">
        <div className="form-container">
          {/* Add floating reviews here */}
          <div className="form-left">
            <h1>Hello!</h1>
          </div>

          <form action={handleCreateAcccount} className="form-right">
            <h1>Create an account</h1>
            <p id="login-link">
              Already have an account? <a href="http://localhost:5173/login">Log in</a>
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
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                />
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

            <button type="button" onClick={signupWithGoogle}>
              <img id="google-icon" src="/google.png" alt="google-icon" width="21px" />
              Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
