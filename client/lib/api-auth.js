const BASE_URL = import.meta.env.VITE_API_URL; // must be set in Render

if (!BASE_URL) {
    console.error("❌ VITE_API_URL is missing. Check your .env and Render env vars.");
}

const API_AUTH = `${BASE_URL}/api/users`; // assuming signin is /api/users/signin

export const signin = async (user) => {
    try {
        const response = await fetch(`${API_AUTH}/signin`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(user),
        });
        return await response.json();
    } catch (err) {
        console.error("❌ Signin failed:", err);
        throw err;
    }
};

export const signout = async () => {
    try {
        const response = await fetch(`${API_AUTH}/signout`, { method: "GET" });
        return await response.json();
    } catch (err) {
        console.error("❌ Signout failed:", err);
        throw err;
    }
};
