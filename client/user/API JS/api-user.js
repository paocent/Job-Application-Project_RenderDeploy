const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
    console.error("❌ VITE_API_URL is missing. Check your .env and Render env vars.");
}

const API_BASE = `${BASE_URL}/api/users`;

// Parse JSON safely
const handleResponse = async (response) => {
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
    }

    try {
        return await response.json();
    } catch (err) {
        console.error("❌ Failed to parse JSON:", err);
        throw err;
    }
};

// Global error wrapper
const handleError = (err) => {
    console.error("❌ API error:", err);
    throw err;
};

export const create = async (user) => {
    try {
        const response = await fetch(API_BASE, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

export const list = async (signal) => {
    try {
        const response = await fetch(API_BASE, {
            method: "GET",
            signal,
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

export const read = async ({ userId }, { t }, signal) => {
    try {
        const response = await fetch(`${API_BASE}/${userId}`, {
            method: "GET",
            signal,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${t}`,
            },
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

export const update = async ({ userId }, { t }, user) => {
    try {
        const response = await fetch(`${API_BASE}/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${t}`,
            },
            body: JSON.stringify(user),
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

export const remove = async ({ userId }, { t }) => {
    try {
        const response = await fetch(`${API_BASE}/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${t}`,
            },
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};
