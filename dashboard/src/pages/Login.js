import { React, useState, useEffect } from "react";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";

function Login() {
    const navigate = useNavigate();
    const initialData = {
        email: "",
        password: "",
    };
    const [currentData, setCurrentData] = useState(initialData);

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:1337/login",
                currentData
            );

            const result = response.data;

            if (result.success) {
                localStorage.setItem("key", JSON.stringify(currentData));
                console.log(currentData);
                navigate("/dashboard");
            }
            alert(result.message);
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occured. Please try again.");
        }
    };

    const handleRedirectToSignUp = async (e) => {
        e.preventDefault();

        navigate("/signup");
    };

    const handleChange = (e) => {
        setCurrentData({
            ...currentData,
            [e.target.name || e.target.id]: e.target.value,
        });
    };

    useEffect(() => {
        const authenticateUser = async () => {
            const creds = JSON.parse(localStorage.getItem("key"));

            if (creds) {
                try {
                    const response = await axios.post(
                        "http://localhost:1337/login",
                        creds
                    );

                    const result = response.data;

                    if (result.success) {
                        navigate("/dashboard");
                    }
                } catch (error) {
                    console.error("Error authenticating:", error);
                    alert("An error occured. Please try again.");
                }
            }
        };

        authenticateUser();
    }, []);

    return (
        <div className="auth-container">
            <Card className="card">
                <CardContent className="card-content">
                <Typography variant="h5">WELCOME BACK</Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            id="email"
                            className="email"
                            required
                            label="Email"
                            variant="outlined"
                            value={currentData.email}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="password"
                            className="password"
                            type={showPassword ? "text" : "password"}
                            required
                            label="Password"
                            variant="outlined"
                            value={currentData.password}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={
                                                toggleShowPassword
                                            }
                                        >
                                            {showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <div className="button-group">
                            <Button variant="contained" type="submit">
                                SIGN IN
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleRedirectToSignUp}
                            >
                                NO ACCOUNT YET?
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;
