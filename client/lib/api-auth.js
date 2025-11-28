
const API_URL = import.meta.env.VITE_API_URL; // e.g., https://job-application-project-renderdeploy-ofv.onrender.com


const signin = async (user) => {
    try {
        const response = await fetch(`${API_URL}/api/users/signin`, { // ✅ Correct path
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(user),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            console.error("Signin failed:", data?.error || "Unknown error");
        }

        return data;
    } catch (err) {
        console.error("Signin API Error:", err);
    }
};


const signout = async () => {
    try {
        const response = await fetch(`${API_URL}/api/users/signout`, { // ✅ Fixed path
            method: "GET",
            credentials: "include",
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            console.error("Signout failed:", data?.error || "Unknown error");
        }

        return data;
    } catch (err) {
        console.error("Signout API Error:", err);
    }
};

export { signin, signout };
