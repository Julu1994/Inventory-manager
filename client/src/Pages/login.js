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

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUser = async () => {
        const user = await axios.get(
            "https://inventory-manager-production.up.railway.app/auth/loggedIn"
        );
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
            await axios.post(
                "https://inventory-manager-production.up.railway.app/auth/login",
                data
            );
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
        <div className="log">
            <Typography
                variant="h5"
                sx={{ textAlign: "center", mb: "3rem", color: "#000080" }}>
                Inventory Manager
            </Typography>
            <Card sx={{ minWidth: 275 }}>
                <form onSubmit={handleLogin}>
                    <Typography
                        variant="h5"
                        sx={{ textAlign: "center", mt: "1rem" }}>
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
                            onChange={(e) => setPassword(e.target.value)}
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            sx={{ width: "100%", mt: "1rem" }}
                        />
                    </CardContent>
                    <CardActions
                        sx={{ display: "flex", justifyContent: "center" }}>
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
                        <Link to="/register" style={{ textDecoration: "none" }}>
                            Register here
                        </Link>
                    </p>
                </div>
            </Card>
            <Alert sx={{ mt: "2rem" }} severity="info">
                Demo Account: demo@gmail.com Password: demo123
            </Alert>
        </div>
    );
};
export default Login;
