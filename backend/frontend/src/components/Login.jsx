import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  const handleSubmit = async (e) => {
    const url = "http://localhost:4000/api/auth/login";
    e.preventDefault();
    const userData = {
      email: state.email,
      password: state.password,
    };
    try {
      const { data } = await axios.post(url, userData);
      const cuser = data.data.user.name;
      console.log(cuser);
      setState({
        email: "",
        password: "",
      });

      if (data.success) {
        localStorage.setItem("token", data.authtoken);
        localStorage.setItem("cuser", JSON.stringify(data.data.user.name));
        props.showAlert("logged in successfully", "success");
        navigate("/");
      }
    } catch (error) {
      console.error(error.response.data);
      if (error.response.data) {
        props.showAlert("Invalid credentials", "danger");
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <h3 className="py-2">Login to Use iNoteBook</h3>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  autoComplete="on"
                  value={state.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                disabled={
                  state.password.email === 0 || state.password.length === 0
                }
                type="submit"
                className="btn btn-primary"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
