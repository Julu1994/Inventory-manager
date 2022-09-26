import "./register.scss";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
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
                <form>
                    <CardContent sx={{ textAlign: "center" }}>
                        <TextField
                            id="standard-basic"
                            label="Name"
                            variant="standard"
                            sx={{ width: "100%", mt: "1rem" }}
                        />
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            label="Email"
                            sx={{ width: "100%", mt: "1rem" }}
                        />
                        <TextField
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
                <p style={{ fontSize: ".8rem", paddingBottom: "1rem" }}>
                    Already have an account ?
                    <div>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            Login here
                        </Link>
                    </div>
                </p>
            </Card>
        </div>
    );
};
export default Register;
