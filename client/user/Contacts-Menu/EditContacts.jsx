// src/user/Contacts-Menu/EditContact.jsx

import React, { useState, useEffect } from "react";
import {
    Card, CardActions, CardContent, Button, TextField, Typography, Icon,
} from "@mui/material";
import auth from "../../lib/auth-helper.js";
// Assuming read and update are correctly structured in api-contacts.js
import { read, update } from "../API JS/api-contacts.js"; 
import { Navigate, useParams } from "react-router-dom";

export default function EditContact() {
    // Correctly reads the contactId from the URL path: /contacts/edit/:contactId
    const { contactId } = useParams(); 
    
    const [values, setValues] = useState({
        firstName: "", 
        lastName: "", 
        email: "",
        error: "",
        redirectToContacts: false, 
    });
    
    const jwt = auth.isAuthenticated();

    useEffect(() => {
        // Prevent API call if contactId is somehow missing (e.g., if the path was /contacts/edit/)
        if (!contactId) {
            setValues((prev) => ({ ...prev, error: "Missing Contact ID in URL" }));
            return;
        }

        const abortController = new AbortController();
        const signal = abortController.signal;

        // 💡 REVISED: Pass { contactId } to align with common API helper structure
        read({ contactId }, { t: jwt.token }, signal).then((data) => { 
            if (data?.error) {
                // If unauthorized or error, set the error state
                setValues((prev) => ({ ...prev, error: data.error }));
            } else {
                // Initialize form fields with data from the API
                setValues((prev) => ({
                    ...prev,
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    email: data.email || "",
                }));
            }
        });

        return () => abortController.abort();
    }, [contactId, jwt.token]); // Dependency array: contactId changes, token is stable

    const clickSubmit = () => {
        const contact = {
            firstName: values.firstName || undefined,
            lastName: values.lastName || undefined,
            email: values.email || undefined,
        };
        
        // 💡 REVISED: Pass { contactId } for the update function
        update({ contactId }, { t: jwt.token }, contact).then((data) => {
            if (data?.error) {
                setValues((prev) => ({ ...prev, error: data.error }));
            } else {
                setValues((prev) => ({
                    ...prev,
                    error: "", // Clear error on success
                    redirectToContacts: true, // Redirect to list view
                }));
            }
        });
    };

    const handleChange = (name) => (event) => {
        setValues((prev) => ({ ...prev, [name]: event.target.value, error: "" })); // Clear error on change
    };

    if (values.redirectToContacts) {
        return <Navigate to={`/contacts`} />;
    }

    return (
        <Card
            sx={{
                maxWidth: 600,
                mx: "auto",
                mt: 5,
                textAlign: "center",
                pb: 2,
            }}
        >
            <CardContent>
                <Typography variant="h6" sx={{ mt: 2, mb: 2, color: "text.primary" }}>
                    Edit Contact
                </Typography>
                
                <TextField
                    id="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange("firstName")}
                    margin="normal"
                    sx={{ mx: 1, width: 300 }}
                />
                <br />
                
                <TextField
                    id="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange("lastName")}
                    margin="normal"
                    sx={{ mx: 1, width: 300 }}
                />
                <br />
                
                <TextField
                    id="email"
                    type="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange("email")}
                    margin="normal"
                    sx={{ mx: 1, width: 300 }}
                />
                <br />
                
                {values.error && (
                    <Typography component="p" color="error" sx={{ mt: 1 }}>
                        <Icon color="error" sx={{ verticalAlign: "middle", mr: 1 }}>
                            error
                        </Icon>
                        {values.error}
                    </Typography>
                )}
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
                <Button color="primary" variant="contained" onClick={clickSubmit} sx={{ mb: 2 }}>
                    Submit
                </Button>
            </CardActions>
        </Card>
    );
}