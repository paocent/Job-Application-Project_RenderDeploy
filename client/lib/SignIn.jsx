import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import ErrorIcon from '@mui/icons-material/Error';
import auth from "./auth-helper.js";
import { Navigate, useLocation } from "react-router-dom";
import { signin } from "./api-auth.js";

// Define consistent colors
const ACCENT_COLOR = "#007bff"; 
const CARD_BG_COLOR = "#1a1a1a";
const BORDER_COLOR = "#333333";
const TEXT_LIGHT_COLOR = "#f0f0f0";

export default function Signin() {
    const location = useLocation();
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        redirectToReferrer: false,
    });
    
    const clickSubmit = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined,
        };
        
        signin(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                auth.authenticate(data, () => {
                    setValues({ ...values, error: "", redirectToReferrer: true });
                });
            }
        });
    };
    
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const { from } = location.state || {
        from: { pathname: "/" },
    };
    const { redirectToReferrer } = values;
    
    if (redirectToReferrer) {
        return <Navigate to={from} />;
    }
    
    return (
        <Card
            elevation={8} // Consistent elevation
            sx={{
                maxWidth: 450, // Consistent width with Signup view
                mx: "auto",
                mt: 5,
                p: 4, // Increased padding
                borderRadius: 2,
                backgroundColor: CARD_BG_COLOR, // Dark background
                border: `1px solid ${BORDER_COLOR}`,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7)",
                textAlign: "center",
            }}
        >
            <CardContent>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        mt: 1, 
                        mb: 4, 
                        fontWeight: 700,
                        color: ACCENT_COLOR, 
                        borderBottom: `2px solid ${ACCENT_COLOR}30`, 
                        pb: 1,
                    }}
                >
                    Sign In to Your Account
                </Typography>

                {/* --- Email Field --- */}
                <TextField
                    id="email"
                    type="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange("email")}
                    margin="normal"
                    fullWidth // Use fullWidth for better responsiveness
                    variant="filled" // Use filled variant for contrast in dark mode
                    sx={{ 
                        mb: 3, 
                        backgroundColor: BORDER_COLOR,
                        borderRadius: 1,
                        '& .MuiInputBase-root': { color: TEXT_LIGHT_COLOR },
                        '& .MuiInputLabel-root': { color: ACCENT_COLOR },
                    }}
                />

                {/* --- Password Field --- */}
                <TextField
                    id="password"
                    type="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange("password")}
                    margin="normal"
                    fullWidth
                    variant="filled"
                    sx={{ 
                        mb: 3, 
                        backgroundColor: BORDER_COLOR,
                        borderRadius: 1,
                        '& .MuiInputBase-root': { color: TEXT_LIGHT_COLOR },
                        '& .MuiInputLabel-root': { color: ACCENT_COLOR },
                    }}
                />

                {/* --- Error Message --- */}
                {values.error && (
                    <Typography 
                        component="p" 
                        color="error" 
                        sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc3545', bgcolor: 'rgba(220, 53, 69, 0.1)', p: 1, borderRadius: 1 }}
                    >
                        <ErrorIcon sx={{ verticalAlign: "middle", mr: 1, fontSize: 18 }} />
                        {values.error}
                    </Typography>
                )}
            </CardContent>
            
            <CardActions sx={{ justifyContent: "center", pt: 0 }}>
                <Button
                    variant="contained"
                    onClick={clickSubmit}
                    sx={{ 
                        margin: "auto", 
                        mb: 2,
                        mt: 2, 
                        bgcolor: ACCENT_COLOR,
                        '&:hover': { bgcolor: '#0056b3' }
                    }}
                >
                    Submit
                </Button>
            </CardActions>
        </Card>
    );
}