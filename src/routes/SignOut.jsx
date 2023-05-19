import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/AuthContext";
import { Logout } from "@kiwicom/orbit-components/lib/icons";

const SignOut = () => {
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
            <div>
                <Button
                    onClick={handleLogout}
                    className="signoutbtn"
                    startIcon={<Logout />}
                    sx={{
                        color: "black",
                        fontWeight: "bold",
                        textTransform: "none",
                        fontSize: "medium",

                        paddingX: 7.5,
                        paddingY: 2.5,
                        "&:hover": {
                            backgroundColor: "cyan",
                            color: "white",
                        },
                    }}
                >
                    SignOut
                </Button>
            </div>
        </>
    );
};

export default SignOut;
