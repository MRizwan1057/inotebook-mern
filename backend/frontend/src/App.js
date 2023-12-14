import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NoteState from "./context/notes/noteState";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert} />
        <div className="container py-3">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} />}
            />
            <Route
              exact
              path="/register"
              element={<Register showAlert={showAlert} />}
            />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
