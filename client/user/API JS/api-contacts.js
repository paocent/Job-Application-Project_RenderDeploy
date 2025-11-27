// src/user/API JS/api-contacts.js

// 🔗 Backend base URL from Vite environment
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
    console.error("❌ VITE_API_URL is missing. Check your .env and Render env vars.");
}

// 🔥 Use full absolute backend URL
const API_BASE = `${BASE_URL}/api/contacts`;

// --- Helper Functions ---

const handleResponse = async (response) => {
    // If HTTP status is not OK
    if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ API Error (${response.status}):`, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 150)}`);
    }

    // Check for JSON response
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        try {
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            return data;
        } catch (err) {
            console.error("❌ JSON parse error:", err);
            throw new Error("Failed to parse server JSON response.");
        }
    }

    // No content (204, delete success)
    return {};
};

const handleError = (err) => {
    console.error("🚨 API call failed:", err);
    return { error: err.message || "Network request failed" };
};

// --- CRUD Functions ---

export const create = async (contact, { t }) => {
    try {
        const response = await fetch(API_BASE, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${t}`,
            },
            body: JSON.stringify(contact),
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

export const list = async (credentials, signal) => {
    try {
        const response = await fetch(API_BASE, {
            method: "GET",
            signal,
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${credentials.t}`,
            },
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

export const read = async ({ contactId }, { t }, signal) => {
    try {
        const response = await fetch(`${API_BASE}/${contactId}`, {
            method: "GET",
            signal,
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${t}`,
            },
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

export const update = async ({ contactId }, { t }, contact) => {
    try {
        const response = await fetch(`${API_BASE}/${contactId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${t}`,
            },
            body: JSON.stringify(contact),
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

export const remove = async ({ contactId }, { t }) => {
    try {
        const response = await fetch(`${API_BASE}/${contactId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${t}`,
            },
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};
