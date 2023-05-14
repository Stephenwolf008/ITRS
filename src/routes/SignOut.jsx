
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/AuthContext";

const SignIn = () => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="signout">
        <Button onClick={handleLogout} className="signoutbtn">
          SignOut
        </Button>
      </div>
    </>
  );
};

export default SignIn;
