import { createContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ColorModeContext = createContext({
    toggleColorMode: () => {},
});

export default function ThemeContextProvider({ children }) {
    // Load saved preference or default to dark
    const [mode, setMode] = useState(
        () => localStorage.getItem("themeMode") || "dark"
    );

    // Persist theme preference
    useEffect(() => {
        localStorage.setItem("themeMode", mode);
        document.body.setAttribute("data-theme", mode);
    }, [mode]);

    // Toggle handler
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prev) => (prev === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    // MUI Theme (soft light + rich dark)
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,

                    primary: {
                        main: "#2563eb", // Professional blue
                    },

                    background: {
                        default:
                            mode === "light" ? "#f3f4f6" : "#0f172a",
                        paper:
                            mode === "light" ? "#e5e7eb" : "#020617",
                    },

                    text: {
                        primary:
                            mode === "light" ? "#111827" : "#f8fafc",
                        secondary:
                            mode === "light" ? "#374151" : "#cbd5e1",
                    },

                    divider:
                        mode === "light" ? "#d1d5db" : "#1e293b",

                    error: {
                        main: "#dc2626",
                    },
                },

                typography: {
                    fontFamily:
                        "Inter, Roboto, Segoe UI, Arial, sans-serif",
                },

                components: {
                    MuiAppBar: {
                        styleOverrides: {
                            root: {
                                backgroundImage: "none",
                            },
                        },
                    },
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                textTransform: "none",
                            },
                        },
                    },
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
