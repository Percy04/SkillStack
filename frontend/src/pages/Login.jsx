import Header from "../components/Header";
import axios from "axios";
import "../styles/pages/login.css";
import { useState } from "react";

function Login() {
  const [loginText, setLoginText] = useState("loginErrorText hide");



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
        const token = response.data.token;
        localStorage.setItem("token", token);

        // console.log(response);
        // window.open.href=("");
        window.location.href = "http://localhost:5173/dashboard";
      })
      .catch(function (error) {
        console.log(error);

        setLoginText("loginErrorText show");
      });
  }

  const loginwithgoogle = () => {
    window.open("http://localhost:5000/auth/google/callback", "_self");
  };

  return (
    <>
      {/* <Header /> */}
      <div className="login-container">
        <div className="form-container">
          {/* Add floating reviews here */}
          <div className="form-left">
            <h1>Namaste!</h1>
          </div>

          <form action={handleLogin} className="form-right">
            <h1 id="welcomeText">Welcome back!</h1>
            <p id="signup-link">
              Don't have an account?{" "}
              <a href="http://localhost:5173/signup">Sign up</a>
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
                <span className={loginText}> Wrong email or password</span>
                <button>Log in</button>
              </div>
            </div>

            <h6>
              <span>Or log in with</span>
            </h6>

            <button type="button" onClick={loginwithgoogle}>
              <img
                id="google-icon"
                src="/google.png"
                alt="google-icon"
                width="20px"
              />
              Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
