import React, { useState, useEffect } from "react";
import {
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Avatar,
    Typography,
    Link,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Use explicit name
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"; // Icon for user avatar
import { list } from "../API JS/api-user.js";
import { Link as RouterLink } from "react-router-dom";

// Define consistent colors
const ACCENT_COLOR = "#007bff"; 
const CARD_BG_COLOR = "#1a1a1a";
const BORDER_COLOR = "#333333";
const TEXT_LIGHT_COLOR = "#f0f0f0";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        list(signal).then((data) => {
            if (data?.error) {
                setError(data.error);
                console.error("Error listing users:", data.error);
            } else {
                setUsers(data);
            }
        });

        return () => abortController.abort();
    }, []);

    return (
        <Paper
            elevation={8} // Consistent elevation
            sx={{
                maxWidth: 650, // Consistent width with Profile view
                mx: "auto",
                mt: 5,
                p: 4, // Increased padding
                borderRadius: 2,
                backgroundColor: CARD_BG_COLOR, // Dark background
                border: `1px solid ${BORDER_COLOR}`,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7)",
            }}
        >
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
                Directory of Users
            </Typography>

            {error ? (
                <Typography color="error" sx={{ textAlign: 'center', my: 3 }}>
                    Error loading users: {error}
                </Typography>
            ) : (
                <List dense>
                    {users.length === 0 ? (
                         <Typography sx={{ color: BORDER_COLOR, textAlign: 'center', my: 3 }}>
                            No users found.
                        </Typography>
                    ) : (
                        users.map((item) => (
                            <Link
                                component={RouterLink}
                                to={`/user/${item._id}`}
                                underline="none"
                                key={item._id}
                                // Ensure link itself doesn't override button styles
                                sx={{ display: 'block' }}
                            >
                                <ListItem 
                                    button 
                                    sx={{ 
                                        borderRadius: 1, 
                                        mb: 1, 
                                        bgcolor: BORDER_COLOR, // Slightly lighter background for list item
                                        '&:hover': { bgcolor: '#444444' } // Hover effect
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: ACCENT_COLOR }}>
                                            <PersonOutlineIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={
                                            <Typography sx={{ color: TEXT_LIGHT_COLOR, fontWeight: 500 }}>
                                                {item.name}
                                            </Typography>
                                        } 
                                        secondary={
                                            <Typography variant="body2" sx={{ color: '#aaaaaa' }}>
                                                Click to view profile
                                            </Typography>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" sx={{ color: ACCENT_COLOR }}>
                                            <ArrowForwardIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </Link>
                        ))
                    )}
                </List>
            )}
        </Paper>
    );
}