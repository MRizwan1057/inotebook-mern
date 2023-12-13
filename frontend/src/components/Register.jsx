import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const Register = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
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
    const url = "http://localhost:4000/api/auth/register";
    e.preventDefault();
    const userData = {
      name: state.name,
      email: state.email,
      password: state.password,
    };
    try {
      const { data } = await axios.post(url, userData);
      console.log(data);
      setState({
        name: "",
        email: "",
        password: "",
      });
      if (data.success) {
        localStorage.setItem("token", data.authtoken);
        navigate("/");
        props.showAlert("account created successfully", "success");
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
              <h3 className="py-2">Register to Use iNoteBook</h3>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
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
                  id="password"
                  name="password"
                  autoComplete="on"
                  value={state.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                disabled={
                  state.password.name === 0 ||
                  state.password.email === 0 ||
                  state.password.length === 0
                }
                type="submit"
                className="btn btn-primary"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
