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

function SignUp() {
    const navigate = useNavigate();
    const initialData = {
        email: "",
        password: "",
    };
    const [currentData, setCurrentData] = useState(initialData);

    //first password field
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    //use this just in case there is another password field
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleChange = (e) => {
        setCurrentData({
            ...currentData,
            [e.target.name || e.target.id]: e.target.value,
        });
    };

    const handleRedirectToLogin = async (e) => {
        e.preventDefault();

        navigate("/");
    };

    const handleSignUp = async (e) => {
      e.preventDefault();

      if (currentData.password !== confirmPassword) {
          alert("Passwords do not match.");
          return;
      }

      try {
          const response = await axios.post(
              "http://localhost:1337/signup",
              currentData
          );

          const result = response.data;

          if (result.success) {
              //route to another page
              navigate("/");
          }
          alert(result.message);
      } catch (error) {
          console.error("Error signing up:", error);
          alert("An error occured. Please try again.");
      }
  };

    return (
        <div className="auth-container">
            <Card className="card">
                <CardContent className="card-content">
                <Typography variant="h5">REGISTER</Typography>
                    <form onSubmit={handleSignUp}>
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
                                            onClick={toggleShowPassword}
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

                        <TextField
                            id="password"
                            className="password"
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            label="Confirm Password"
                            variant="outlined"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={toggleShowConfirmPassword}
                                        >
                                            {showConfirmPassword ? (
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
                                SIGN UP
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleRedirectToLogin}
                            >
                                BACK
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default SignUp;
