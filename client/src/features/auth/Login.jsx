import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/login", {
        username,
        password,
      })
      .then((response) => {
        const userInfo = response.data;
        const admindata = userInfo.user_data;
        const { token } = admindata;

        document.cookie = `token=${token}`;

        localStorage.setItem("user", token);

        // localStorage.setItem({'user' : token})
        // console.log(typeof token);
        navigate("/dash");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className="main-card">
      <div className="p-5 login-card shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control py-3 border-success"
              id="username"
              aria-describedby="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control py-3 border-success"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn login-btn py-3 rounded">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
