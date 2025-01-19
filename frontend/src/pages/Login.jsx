import Header from "../components/Header";
import axios from "axios";
import "../styles/pages/login.css";

function Login() {
  function handleLogin(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(email, password);

    //Make port number dynamic
    axios
      .post("http://localhost:5000/auth/login", {
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
    <div className="login-container">
      <Header />

      <div className="form-container">
        {/* Add floating reviews here */}
        <div className="form-left">
          <h1>slkfjd</h1>
        </div>

        <form action={handleLogin} className="form-right">
          <h1 id="welcomeText">Welcome back!</h1>
          <p id="signup-link">
            Don't have an account? <a href="#signup">Sign up</a>
          </p>

          <div className="input-section">
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
              <button>Log in</button>
            </div>
          </div>

          <h6>
            <span>Or log in with</span>
          </h6>

          <button>Google</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
