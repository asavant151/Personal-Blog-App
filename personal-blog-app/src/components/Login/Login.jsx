import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users?email=${email}&password=${password}`
      );
      if (response.data.length > 0) {
        localStorage.setItem("user", JSON.stringify(response.data[0]));
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid email or password");
        navigate("/login");
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
    }
  };
  return (
    <>
      <div className="login-section">
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="row border rounded-5 p-3 bg-white shadow box-area">
            <div
              className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
              style={{ background: "#103cbe" }}
            >
              <div className="featured-image mb-3">
                <img
                  src="./assets/images/1.png"
                  className="img-fluid"
                  style={{ width: 250 }}
                />
              </div>
              <p
                className="text-white fs-2"
                style={{
                  fontFamily: '"Courier New", Courier, monospace',
                  fontWeight: 600,
                }}
              >
                Be Verified
              </p>
              <small
                className="text-white text-wrap text-center"
                style={{
                  width: "17rem",
                  fontFamily: '"Courier New", Courier, monospace',
                }}
              >
                Join experienced Designers on this platform.
              </small>
            </div>
            <div className="col-md-6 right-box">
              <div className="row align-items-center">
                <div className="header-text mb-4">
                  <h2>Welcome to</h2>
                  <p className="h4">Personal Blog App</p>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-group mb-1">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="input-group mt-3 mb-5 d-flex justify-content-between">
                  <label
                    htmlFor="formCheck"
                    className="form-check-label text-secondary"
                  >
                    <small>Don't have any account?</small>
                  </label>
                  <div className="forgot">
                    <small>
                      <Link to={"/signup"}>Signup</Link>
                    </small>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <button
                    className="btn btn-lg btn-primary w-100 fs-6"
                    id="loginButton"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
