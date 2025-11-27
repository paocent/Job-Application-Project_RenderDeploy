import { useState, useEffect } from "react";
import {
    Card,
    CardActions,
    CardContent,
    Button,
    TextField,
    Typography,
    Icon,
    Alert, // Using Alert for better error display
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import auth from "../../lib/auth-helper.js";
import { read, update } from "../API JS/api-user.js";
import { Navigate, useParams } from "react-router-dom";

// Define consistent colors
const ACCENT_COLOR = "#007bff"; 
const CARD_BG_COLOR = "#1a1a1a";
const BORDER_COLOR = "#333333";

export default function EditProfile() {
    const { userId } = useParams();
    const [values, setValues] = useState({
        name: "",
        password: "",
        email: "",
        error: "",
        NavigateToProfile: false,
        success: false, // New state for success feedback
    });
    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        read({ userId }, { t: jwt.token }, signal).then((data) => {
            if (data?.error) {
                setValues((prev) => ({ ...prev, error: data.error }));
            } else {
                setValues((prev) => ({
                    ...prev,
                    name: data.name || "",
                    email: data.email || "",
                }));
            }
        });

        return () => abortController.abort();
    }, [userId, jwt.token]);

    const clickSubmit = () => {
        setValues((prev) => ({ ...prev, error: "", success: false })); // Clear previous status
        
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            // Only send password if it's set (i.e., user wants to change it)
            password: values.password || undefined, 
        };
        
        update({ userId }, { t: jwt.token }, user).then((data) => {
            if (data?.error) {
                setValues((prev) => ({ ...prev, error: data.error }));
            } else {
                // On successful update, set success message and clear password field
                setValues((prev) => ({
                    ...prev,
                    password: "", // Clear password field for security
                    error: "",
                    success: true,
                    // Navigate to profile after a short delay to allow success message to be seen
                }));
                setTimeout(() => {
                    setValues((prev) => ({ ...prev, NavigateToProfile: true }));
                }, 1500); 
            }
        });
    };

    const handleChange = (name) => (event) => {
        setValues((prev) => ({ ...prev, [name]: event.target.value }));
    };

    if (values.NavigateToProfile) {
        return <Navigate to={`/user/${userId}`} />; // Use userId from useParams to ensure correct navigation
    }

    return (
        <Card
            elevation={8} // Consistent elevation with Profile view
            sx={{
                maxWidth: 650, // Consistent width with Profile view
                mx: "auto",
                mt: 5,
                p: 4, 
                borderRadius: 2,
                backgroundColor: CARD_BG_COLOR, // Dark background
                border: `1px solid ${BORDER_COLOR}`, // Subtle border
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7)", // Deep shadow
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
                    Edit Account Details
                </Typography>
                
                {/* --- Input Fields --- */}
                <TextField
                    id="name"
                    label="Name"
                    value={values.name}
                    onChange={handleChange("name")}
                    margin="normal"
                    fullWidth // Make fields full width for better mobile layout
                    variant="filled" // Use filled variant for contrast in dark mode
                    sx={{ 
                        mb: 3, 
                        backgroundColor: BORDER_COLOR, // Darker input background
                        borderRadius: 1,
                        '& .MuiInputBase-root': { color: '#f0f0f0' }, // Input text color
                        '& .MuiInputLabel-root': { color: ACCENT_COLOR }, // Label color
                    }}
                />
                
                <TextField
                    id="email"
                    type="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange("email")}
                    margin="normal"
                    fullWidth
                    variant="filled"
                     sx={{ 
                        mb: 3, 
                        backgroundColor: BORDER_COLOR,
                        borderRadius: 1,
                        '& .MuiInputBase-root': { color: '#f0f0f0' },
                        '& .MuiInputLabel-root': { color: ACCENT_COLOR },
                    }}
                />
                
                <TextField
                    id="password"
                    type="password"
                    label="New Password (Leave blank to keep current)"
                    value={values.password}
                    onChange={handleChange("password")}
                    margin="normal"
                    fullWidth
                    variant="filled"
                    sx={{ 
                        mb: 3, 
                        backgroundColor: BORDER_COLOR,
                        borderRadius: 1,
                        '& .MuiInputBase-root': { color: '#f0f0f0' },
                        '& .MuiInputLabel-root': { color: ACCENT_COLOR },
                    }}
                />
                
                {/* --- Feedback Messages --- */}
                {values.error && (
                    <Alert 
                        severity="error" 
                        icon={<ErrorIcon fontSize="inherit" />} 
                        sx={{ mt: 2, mb: 2, textAlign: 'left' }}
                    >
                        {values.error}
                    </Alert>
                )}
                 {values.success && (
                    <Alert 
                        severity="success" 
                        icon={<CheckCircleIcon fontSize="inherit" />} 
                        sx={{ mt: 2, mb: 2, textAlign: 'left' }}
                    >
                        Profile updated successfully! Redirecting...
                    </Alert>
                )}

            </CardContent>
            <CardActions sx={{ justifyContent: "center", pt: 0 }}>
                <Button 
                    color="primary" 
                    variant="contained" 
                    onClick={clickSubmit} 
                    sx={{ 
                        mb: 2,
                        mt: 1, 
                        bgcolor: ACCENT_COLOR,
                        '&:hover': { bgcolor: '#0056b3' }
                    }}
                >
                    Save Changes
                </Button>
            </CardActions>
        </Card>
    );
}