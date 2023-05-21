import "./login.scss";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Alert, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Notify } from "notiflix";
import { userActions } from "../Redux/Features/userSlice";
import { useDispatch } from "react-redux";
import { config } from "../config";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUser = async () => {
        const user = await axios.get(`${config.SERVER_LINK}/auth/loginedIn`);
        if (user.data.id) {
            dispatch(userActions.isUser());
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const data = {
            email,
            password,
        };
        try {
            await axios.post(`${config.SERVER_LINK}/auth/login`, data);
            getUser();
            Notify.success("Successful login");
            navigate("/");
            setEmail("");
            setPassword("");
        } catch {
            Notify.failure("Error! Login failed");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="log">
                <Typography
                    variant="h5"
                    sx={{ textAlign: "center", mb: "3rem", color: "#000080" }}>
                    Inventory Manager
                </Typography>
                <div className="login-form">
                    <Card
                        sx={{
                            minWidth: 275,
                            background: "transparent",
                            padding: "0",
                            margin: "0",
                            boxShadow: "none",
                        }}>
                        <form onSubmit={handleLogin} className="login-form">
                            <Typography
                                variant="h5"
                                sx={{ textAlign: "center" }}>
                                Login
                            </Typography>
                            <CardContent sx={{ textAlign: "center" }}>
                                <TextField
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="standard-basic"
                                    variant="standard"
                                    label="Email"
                                    sx={{ width: "100%", mt: "1rem" }}
                                />
                                <TextField
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    id="standard-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="standard"
                                    sx={{ width: "100%", mt: "1rem" }}
                                />
                            </CardContent>
                            <CardActions
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}>
                                <Button
                                    variant="contained"
                                    size="big"
                                    type="submit"
                                    sx={{
                                        width: "100%",
                                        mt: "1rem",
                                    }}>
                                    Login
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
                                <Link
                                    to="/register"
                                    style={{
                                        textDecoration: "none",
                                        margin: "0",
                                    }}>
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </Card>
                </div>
                <Alert sx={{ mt: "2rem" }} severity="info">
                    Demo Account: demo@gmail.com Password: demo123
                </Alert>
            </div>
        </div>
    );
};
export default Login;
