const BASE_URL = import.meta.env.VITE_API_URL; 
// VITE_API_URL = 'https://job-application-project-renderdeploy.onrender.com'

const API_AUTH = `${import.meta.env.VITE_API_URL}/api/users`; // no trailing slash

export const signin = async (user) => {
  const response = await fetch(`${API_AUTH}/signin`, { // no trailing slash
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(user)
  });
  return await response.json();
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
