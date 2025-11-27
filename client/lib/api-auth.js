const BASE_URL = import.meta.env.VITE_API_URL; // set this to your backend URL on Render
const API_AUTH = `${BASE_URL}/api/users`;

export const signin = async (user) => {
  try {
    const response = await fetch(`${API_AUTH}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.error('❌ Signin failed:', err);
    throw err;
  }
};

export const signout = async () => {
  try {
    const response = await fetch(`${API_AUTH}/signout`, {
      method: 'GET',
      credentials: 'include',
    });
    return await response.json();
  } catch (err) {
    console.error('❌ Signout failed:', err);
    throw err;
  }
};
