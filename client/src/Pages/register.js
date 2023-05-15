import "./register.scss";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Notify } from "notiflix";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        const data = {
            name,
            email,
            password,
            confirm,
        };
        try {
            await axios.post("http://localhost:4000/api/v1/auth/signup", data);
            Notify.success("Successfully Registered");
            navigate("/");
            setName("");
            setEmail("");
            setPassword("");
            setConfirm("");
        } catch {
            Notify.failure("Error! Something went wrong!");
        }
    };
    return (
        <div className="reg">
            <Typography
                variant="h5"
                sx={{ textAlign: "center", mb: "3rem", color: "#000080" }}>
                Inventory Manager
            </Typography>
            <Card sx={{ minWidth: 275 }}>
                <Typography
                    variant="h5"
                    sx={{ textAlign: "center", mt: "1rem" }}>
                    Register
                </Typography>
                <form onSubmit={handleRegister}>
                    <CardContent sx={{ textAlign: "center" }}>
                        <TextField
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            id="standard"
                            label="Name"
                            variant="standard"
                            sx={{ width: "100%", mt: "1rem" }}
                        />
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            id="standard-basic"
                            variant="standard"
                            label="Email"
                            sx={{ width: "100%", mt: "1rem" }}
                        />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            sx={{ width: "100%", mt: "1rem" }}
                        />
                        <TextField
                            onChange={(e) => setConfirm(e.target.value)}
                            value={confirm}
                            id="confirm-password-input"
                            label="Confirm password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            sx={{ width: "100%", mt: "1rem" }}
                        />
                    </CardContent>
                    <CardActions
                        sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="big"
                            sx={{
                                width: "100%",
                                mt: "1rem",
                            }}>
                            Sign up
                        </Button>
                    </CardActions>
                </form>
                <div>
                    <p
                        style={{
                            fontSize: ".8rem",
                            paddingLeft: "1rem",
                        }}>
                        Don't have an account ?
                    </p>
                    <p
                        style={{
                            fontSize: ".8rem",
                            paddingBottom: "1rem",
                            paddingLeft: "1rem",
                        }}>
                        <Link to="/register" style={{ textDecoration: "none" }}>
                            Register here
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};
export default Register;
