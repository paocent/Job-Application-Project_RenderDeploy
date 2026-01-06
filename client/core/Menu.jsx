import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import auth from "../lib/auth-helper";
import { ColorModeContext } from "../src/context/ThemeContext";

// Accessibility-safe color helpers
const getLinkColor = (active, theme) =>
    active ? theme.palette.primary.main : theme.palette.text.secondary;

export default function Menu() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const isAuthenticated = auth.isAuthenticated();
    const userId = isAuthenticated ? isAuthenticated.user._id : null;

    return (
        <AppBar
            position="static"
            elevation={2}
            sx={{
                backgroundColor: theme.palette.background.paper,
                borderBottom: "2px solid",
                borderColor: theme.palette.primary.main,
            }}
        >
            <Toolbar sx={{ display: "flex", gap: 1 }}>
                {/* Title */}
                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        letterSpacing: "1px",
                    }}
                >
                    Job Application Tracker (JAT)
                </Typography>

                {/* Dark / Light Toggle */}
                <IconButton
                    onClick={colorMode.toggleColorMode}
                    aria-label="Toggle dark/light mode"
                    sx={{ color: theme.palette.text.primary }}
                >
                    {theme.palette.mode === "dark" ? (
                        <LightModeIcon />
                    ) : (
                        <DarkModeIcon />
                    )}
                </IconButton>

                {/* Home */}
                <Link to="/">
                    <IconButton
                        aria-label="Home"
                        sx={{
                            color: getLinkColor(
                                location.pathname === "/",
                                theme
                            ),
                            "&:focus-visible": {
                                outline: "2px solid",
                                outlineColor: theme.palette.primary.main,
                                outlineOffset: "2px",
                            },
                        }}
                    >
                        <HomeIcon />
                    </IconButton>
                </Link>

                <Link to="/users">
                    <Button
                        sx={{
                            color: getLinkColor(
                                location.pathname === "/users",
                                theme
                            ),
                            "&:hover": {
                                color: theme.palette.primary.main,
                            },
                            "&:focus-visible": {
                                outline: "2px solid",
                                outlineColor: theme.palette.primary.main,
                                outlineOffset: "2px",
                            },
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
                                    color: getLinkColor(
                                        location.pathname === "/signup",
                                        theme
                                    ),
                                }}
                            >
                                Sign up
                            </Button>
                        </Link>

                        <Link to="/signin">
                            <Button
                                variant="outlined"
                                sx={{
                                    color: getLinkColor(
                                        location.pathname === "/signin",
                                        theme
                                    ),
                                    borderColor:
                                        location.pathname === "/signin"
                                            ? theme.palette.primary.main
                                            : theme.palette.text.secondary,
                                    "&:hover": {
                                        borderColor:
                                            theme.palette.primary.main,
                                    },
                                }}
                            >
                                Sign In
                            </Button>
                        </Link>
                    </>
                )}

                {isAuthenticated && (
                    <>
                        <Link to="/dashboard">
                            <Button
                                sx={{
                                    color: getLinkColor(
                                        location.pathname.startsWith(
                                            "/dashboard"
                                        ),
                                        theme
                                    ),
                                }}
                            >
                                Dashboard
                            </Button>
                        </Link>

                        <Link to={`/user/${userId}`}>
                            <Button
                                sx={{
                                    color: getLinkColor(
                                        location.pathname.startsWith(
                                            `/user/${userId}`
                                        ),
                                        theme
                                    ),
                                }}
                            >
                                My Profile
                            </Button>
                        </Link>

                        <Button
                            sx={{
                                color: theme.palette.error.main,
                                fontWeight: 500,
                                ml: 1,
                                border: "1px solid",
                                borderColor: theme.palette.error.main,
                                "&:hover": {
                                    backgroundColor:
                                        theme.palette.error.main + "22",
                                },
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
