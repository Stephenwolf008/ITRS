// import React, { useEffect } from "react";
// import { GoogleButton } from "react-google-button";
// import { UserAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const SignIn = () => {
//   const { googleSignIn, user } = UserAuth();
//   const navigate = useNavigate();

//   const handleGoogleSignIn = async () => {
//     try {
//       await googleSignIn();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (user != null) {
//       navigate("/home");
//     }
//   });

//   return (
//     // <div className="outterdiv">
//       <div className="signin">
//         <h1 className="">Sign in</h1>
//         <div className="googlebtn">
//           <GoogleButton onClick={handleGoogleSignIn} />
//         </div>
//       </div>
//     // </div>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="outerdiv">
      <div className="box">
        <h1 className="heading">Login</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="email" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="password" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div>
            <Button type="Submit">Log In</Button>
          </div>
        </Form>
        <div className="googlebtn">
          <GoogleButton type="dark" onClick={handleGoogleSignIn} />
        </div>
      </div>
      <div className="text">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default SignIn;
