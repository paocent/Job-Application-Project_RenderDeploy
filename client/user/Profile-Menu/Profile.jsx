import React, { useState, useEffect } from "react";
import {
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Avatar,
    IconButton,
    Typography,
    Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import DeleteUser from "../Users-Menu/DeleteUser.jsx";
import auth from "../../lib/auth-helper.js";
import { read } from "../API JS/api-user.js";
import { useLocation, Navigate, Link, useParams } from "react-router-dom";

// Define a consistent professional accent color for actions
const ACCENT_COLOR = "#007bff"; 
const TEXT_SECONDARY_COLOR = "#aaaaaa"; // Muted text color for dark mode

export default function Profile() {
    const location = useLocation();
    const [user, setUser] = useState({});
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const jwt = auth.isAuthenticated();
    const { userId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        // Check if jwt and userId are available before fetching
        if (jwt.token && userId) {
            read({ userId }, { t: jwt.token }, signal).then((data) => {
                if (data && data.error) {
                    setRedirectToSignin(true);
                } else {
                    setUser(data);
                }
            });
        } else {
            // Handle case where auth or userId might be missing (though the router should prevent this)
            setRedirectToSignin(true);
        }
        
        return () => abortController.abort();
    }, [userId, jwt.token]); // Added jwt.token to dependencies

    if (redirectToSignin) {
        return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
    }

    // Safely determine the role for display
    const userRole = user.role ? user.role.toUpperCase() : 'N/A';
    const primaryText = user.name ? user.name : 'Loading...';

    return (
        <Paper
            elevation={8} // Increased elevation for a floating effect
            sx={{
                maxWidth: 650, // Slightly wider card
                mx: "auto",
                mt: 5,
                p: 4, // Increased padding
                borderRadius: 2, // Slightly more rounded corners
                backgroundColor: "#1a1a1a", // Darker background for the card
                border: `1px solid #333333`, // Subtle border
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7)", // Deep shadow
            }}
        >
            <Typography 
                variant="h4" // Larger, more prominent title
                sx={{ 
                    mt: 1, 
                    mb: 4, 
                    fontWeight: 700,
                    color: ACCENT_COLOR, // Use the professional accent color
                    borderBottom: `2px solid ${ACCENT_COLOR}30`, // Subtle underline
                    pb: 1,
                }}
            >
                User Profile
            </Typography>
            
            <List dense>
                {/* --- Primary User Info (Name, Email, Actions) --- */}
                <ListItem sx={{ alignItems: 'flex-start' }}>
                    <ListItemAvatar>
                        <Avatar sx={{ 
                            width: 60, 
                            height: 60, 
                            bgcolor: ACCENT_COLOR 
                        }}>
                            <PersonIcon sx={{ fontSize: 40 }} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                        primary={
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#f0f0f0' }}>
                                {primaryText}
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body1" sx={{ color: TEXT_SECONDARY_COLOR }}>
                                {user.email}
                            </Typography>
                        }
                        sx={{ ml: 2, justifyContent: 'center' }}
                    />
                    
                    {auth.isAuthenticated().user &&
                        auth.isAuthenticated().user._id === user._id && (
                            <ListItemSecondaryAction>
                                <Link to={`/user/edit/${user._id}`}>
                                    <IconButton aria-label="Edit" sx={{ color: ACCENT_COLOR, '&:hover': { color: '#0056b3' } }}>
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                                <DeleteUser userId={user._id} />
                            </ListItemSecondaryAction>
                        )}
                </ListItem>
                
                <Divider sx={{ my: 2, borderColor: '#333333' }} />
                
                {/* --- User Role --- */}
                <ListItem>
                    <ListItemText
                        primary={
                            <Typography variant="subtitle1" sx={{ color: '#f0f0f0', fontWeight: 500 }}>
                                Role
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body2" sx={{ color: TEXT_SECONDARY_COLOR }}>
                                {userRole}
                            </Typography>
                        }
                    />
                     <ListItemText
                        primary={
                            <Typography variant="subtitle1" sx={{ color: '#f0f0f0', fontWeight: 500, textAlign: 'right' }}>
                                Account ID
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body2" sx={{ color: TEXT_SECONDARY_COLOR, textAlign: 'right' }}>
                                {/* Displaying the actual _id for clarity/debugging */}
                                {user._id || 'N/A'} 
                            </Typography>
                        }
                    />
                </ListItem>
                
                <Divider sx={{ my: 2, borderColor: '#333333' }} />
                
                {/* --- Join Date --- */}
                <ListItem>
                    <ListItemText
                        primary={
                            <Typography variant="subtitle1" sx={{ color: '#f0f0f0', fontWeight: 500 }}>
                                Joined
                            </Typography>
                        }
                        secondary={
                            // FIX: Wrap date in Typography with explicit color for better contrast
                            <Typography variant="body2" sx={{ color: TEXT_SECONDARY_COLOR }}>
                                {user.created
                                    ? new Date(user.created).toLocaleDateString()
                                    : "N/A"}
                            </Typography>
                        }
                    />
                    <ListItemText
                        secondary={
                            <Typography variant="caption" sx={{ color: TEXT_SECONDARY_COLOR, textAlign: 'right', display: 'block' }}>
                                {/* Optional: Display a status or a tag */}
                                {userRole === 'ADMIN' ? 'Administrator' : 'Verified User'} 
                            </Typography>
                        }
                    />
                </ListItem>

            </List>
        </Paper>
    );
}