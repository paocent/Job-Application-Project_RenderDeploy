// src/components/Menu.jsx

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import auth from "../lib/auth-helper";
import { Link, useNavigate, useLocation } from "react-router-dom";

// 🔑 New professional active color
const ACTIVE_COLOR = "#007bff"; // Professional Blue Accent
const INACTIVE_COLOR = "#e0e0e0"; // Light gray for inactive text

// Helper function to set link color based on active path (exact match)
const isActive = (location, path) =>
    location.pathname === path ? ACTIVE_COLOR : INACTIVE_COLOR;

// Helper function for partial match
const isPartiallyActive = (location, path) => {
    // Exact match takes precedence
    if (location.pathname === path) return ACTIVE_COLOR;
    
    // Check if the current path starts with the base path
    return location.pathname.startsWith(path) ? ACTIVE_COLOR : INACTIVE_COLOR;
};

export default function Menu() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = auth.isAuthenticated();
    const userId = isAuthenticated ? isAuthenticated.user._id : null;

    return (
        <AppBar 
            position="static" 
            // 🔑 Custom styling for a professional dark header
            sx={{ backgroundColor: "#1f2937", borderBottom: "2px solid #3b82f6" }} 
        >
            <Toolbar sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                
                {/* 🔑 Updated Typography for better branding */}
                <Typography 
                    variant="h6" 
                    sx={{ 
                        flexGrow: 1, 
                        fontWeight: 600, 
                        color: "#fff",
                        // Subtle spacing and alignment change for the title
                        letterSpacing: '1px' 
                    }}
                >
                    Job Application Tracker (JAT)
                </Typography>

                {/* --- Public Links --- */}
                <Link to="/">
                    <IconButton 
                        aria-label="Home" 
                        sx={{ 
                            color: isActive(location, "/"),
                            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" } // Hover effect
                        }}
                    >
                        <HomeIcon />
                    </IconButton>
                </Link>

                <Link to="/users">
                    <Button 
                        sx={{ 
                            color: isActive(location, "/users"),
                            "&:hover": { color: ACTIVE_COLOR } // Highlight on hover
                        }}
                    >
                        Users
                    </Button>
                </Link>

                {!isAuthenticated && (
                    <>
                        <Link to="/signup">
                            <Button 
                                sx={{ 
                                    color: isActive(location, "/signup"),
                                    "&:hover": { color: ACTIVE_COLOR }
                                }}
                            >
                                Sign up
                            </Button>
                        </Link>

                        <Link to="/signin">
                            {/* 🔑 Give the Sign In button a subtle border to make it stand out as an action */}
                            <Button 
                                variant="outlined" 
                                sx={{ 
                                    color: isActive(location, "/signin"), 
                                    borderColor: isActive(location, "/signin"),
                                    "&:hover": { 
                                        color: ACTIVE_COLOR, 
                                        borderColor: ACTIVE_COLOR,
                                        backgroundColor: "rgba(0, 123, 255, 0.1)"
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                        </Link>
                    </>
                )}

                {/* --- Authenticated Links --- */}
                {isAuthenticated && (
                    <>
                        {/* 1. Dashboard Link (Moved up for priority) */}
                        <Link to="/dashboard">
                            <Button 
                                sx={{ 
                                    color: isPartiallyActive(location, "/dashboard"),
                                    "&:hover": { color: ACTIVE_COLOR }
                                }}
                            >
                                Dashboard
                            </Button>
                        </Link>
                        
                        {/* 2. Profile Link */}
                        <Link to={`/user/${userId}`}>
                            <Button
                                sx={{
                                    color: isPartiallyActive(location, `/user/${userId}`),
                                    "&:hover": { color: ACTIVE_COLOR }
                                }}
                            >
                                My Profile
                            </Button>
                        </Link>

                        {/* 3. Sign Out */}
                        <Button
                            // 🔑 Distinct style for Sign Out (clear and non-threatening)
                            sx={{ 
                                color: "#dc3545", // Subtle red for exit/sign out
                                fontWeight: 500, 
                                ml: 1, // Added margin left for separation
                                border: '1px solid #dc354540',
                                "&:hover": { 
                                    backgroundColor: "rgba(220, 53, 69, 0.1)",
                                    color: "#f44336"
                                }
                            }}
                            onClick={() => {
                                auth.clearJWT(() => navigate("/"));
                            }}
                        >
                            Sign out
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}