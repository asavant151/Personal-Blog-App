import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  console.log("formData==>", formData);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/users", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log(response.data);
      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("There was an error signing up!", error);
    }
  };
  return (
    <>
      <div className="signup-section">
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
                    type="text"
                    id="username"
                    name="username"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="User Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Email address"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-1">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mt-3 mb-5 d-flex justify-content-between">
                  <label
                    htmlFor="formCheck"
                    className="form-check-label text-secondary"
                  >
                    <small>Already have an account?</small>
                  </label>
                  <div className="forgot">
                    <small>
                      <Link to={"/login"}>Login</Link>
                    </small>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <button
                    className="btn btn-lg btn-primary w-100 fs-6"
                    onClick={handleSignup}
                  >
                    Signup
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

export default Signup;
