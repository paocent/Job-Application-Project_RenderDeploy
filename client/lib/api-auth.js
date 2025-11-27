const BASE_URL = import.meta.env.VITE_API_URL; // must be https://job-application-project-renderdeploy.onrender.com
const API_AUTH = `${BASE_URL}/api/users`;      // do NOT include /auth

export const signin = async (user) => {
  try {
    const response = await fetch(`${API_AUTH}/signin`, { // matches backend
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // include cookies
      body: JSON.stringify(user)
    });
    return await response.json();
  } catch (err) {
    console.error('Signin API Error:', err);
    throw err;
  }
};

export const signout = async () => {
  try {
    const response = await fetch(`${API_AUTH}/signout`, {
      method: 'GET',
      credentials: 'include'
    });
    return await response.json();
  } catch (err) {
    console.error('Signout API Error:', err);
    throw err;
  }
};
