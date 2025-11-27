import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    TextField,
    CardActions,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Icon,
} from "@mui/material";
import { Link } from "react-router-dom";
import { create } from "./API JS/api-user";
import ErrorIcon from '@mui/icons-material/Error';

// Define consistent colors
const ACCENT_COLOR = "#007bff"; 
const CARD_BG_COLOR = "#1a1a1a";
const BORDER_COLOR = "#333333";
const TEXT_LIGHT_COLOR = "#f0f0f0";

export default function Signup() {
    const [values, setValues] = useState({
        name: "",
        password: "",
        email: "",
        error: "",
    })
    const [open, setOpen] = useState(false);
    
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clickSubmit = () => {
        setValues({ ...values, error: "" }); // Clear previous error

        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
        };
        
        create(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setOpen(true);
            }
        });
    };
    
    return (
        <div>
            {/* --- Signup Card --- */}
            <Card
                elevation={8} // Consistent elevation
                sx={{
                    maxWidth: 450, // Slightly wider for better field visibility
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
                        Create New Account
                    </Typography>
                    
                    {/* --- Name Field --- */}
                    <TextField
                        id="name"
                        label="Name"
                        value={values.name}
                        onChange={handleChange("name")}
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

                    {/* --- Email Field --- */}
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        value={values.email}
                        onChange={handleChange("email")}
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

                    {/* --- Password Field --- */}
                    <TextField
                        id="password"
                        label="Password"
                        value={values.password}
                        onChange={handleChange("password")}
                        type="password"
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
                            color="error" 
                            sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc3545', bgcolor: 'rgba(220, 53, 69, 0.1)', p: 1, borderRadius: 1 }}
                        >
                            <ErrorIcon sx={{ mr: 1, fontSize: 18 }} />
                            {values.error}
                        </Typography>
                    )}
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        onClick={clickSubmit}
                        sx={{ 
                            margin: "0 auto", 
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
            
            {/* --- Success Dialog (Kept simple to use default MUI theme over dark card) --- */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ color: ACCENT_COLOR, fontWeight: 600 }}>Account Created</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your new account has been successfully created. You can now sign in.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/signin" style={{ textDecoration: 'none' }}>
                        <Button 
                            color="primary"
                            autoFocus
                            variant="contained"
                            onClick={handleClose}
                            sx={{ 
                                bgcolor: ACCENT_COLOR,
                                '&:hover': { bgcolor: '#0056b3' }
                            }}
                        >
                            Sign In
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
}