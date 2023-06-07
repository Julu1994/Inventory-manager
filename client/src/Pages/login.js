import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { TextField, Typography, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Notify } from "notiflix";
import { userActions } from "../Redux/Features/userSlice";
import { useDispatch } from "react-redux";
import { config } from "../config";
import styled from "@emotion/styled";
import { CssBaseline } from "@mui/material";
import backgroundImage from "../utils/assetes/midjourney1.png";

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0),
    color: theme.palette.text.primary,
}));

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUser = async () => {
        const user = await axios.get(`${config.SERVER_LINK}/auth/loginedIn`);
        if (user.data.id) {
            dispatch(userActions.isUser(user.data.role));
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
        <>
            <CssBaseline />
            <Grid
                container
                spacing={0}
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(90deg, rgba(246, 246, 246, 0.975) 0%, rgba(231, 231, 233, 0.42) 35%, rgba(248, 249, 249, 0.822) 100%), url(${backgroundImage})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}>
                <Grid item xs={10} sm={8} md={3.5}>
                    <StyledCard elevation={6} square>
                        <Card
                            sx={{
                                background: "transparent",
                                padding: "0",
                                margin: "0",
                                boxShadow: "none",
                            }}>
                            <form onSubmit={handleLogin} className="login-form">
                                <CardContent
                                    sx={{
                                        textAlign: "center",
                                        paddingTop: "2rem",
                                    }}>
                                    <Typography
                                        variant="h5"
                                        sx={{ textAlign: "center" }}>
                                        Login
                                    </Typography>
                                    <TextField
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
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
                                        flexDirection: "column",
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
                                    <div>
                                        <p
                                            style={{
                                                fontSize: ".8rem",
                                                paddingLeft: ".1rem",
                                            }}>
                                            Don't have an account ?
                                        </p>
                                        <p
                                            style={{
                                                fontSize: ".8rem",
                                                paddingBottom: "1rem",
                                                paddingLeft: ".1rem",
                                            }}>
                                            <Link
                                                to="/signup"
                                                style={{
                                                    textDecoration: "none",
                                                    margin: "0",
                                                }}>
                                                Register here
                                            </Link>
                                        </p>
                                    </div>
                                </CardActions>
                            </form>
                        </Card>
                    </StyledCard>
                </Grid>
            </Grid>
        </>
    );
};
export default Login;
