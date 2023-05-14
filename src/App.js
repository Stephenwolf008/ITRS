import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Protected from "./components/Protected";
import { AuthContextProvider } from "./context/AuthContext";
//import Navbar from "./components/Navbar";
import About from "./routes/About";
import Form from "./routes/Form";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" exact element={<SignIn />} />
          <Route
            path="/home"
            exact
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route path="/about" exact element={<About />} />
          <Route path="/form" exact element={<Form />} />
          <Route path="/signup" exact element={<SignUp />} />
          </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
