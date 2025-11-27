// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// const {PORT = 3000} = process.env;

// // https://vite.dev/config/
// export default defineConfig({
//   root: './client', 
//   plugins: [react()],
//   server: {
//     // 💡 ALL proxy rules must be inside this object
//     proxy: {
//       // 1. Corrected /api rule (using the object structure for options)
//       '/api': {
//         target: `http://localhost:${PORT}`,
//         changeOrigin: true,
//         // Optional: rewrite the path if needed (e.g., to remove '/api')
//         // rewrite: (path) => path.replace(/^\/api/, '')
//       },
//       // 2. Corrected /auth rule
//       '/auth': {
//         target: `http://localhost:${PORT}`,
//         changeOrigin: true,
//       },
//     },
    
//     // 3. Move 'build' outside of 'server' and define it at the top level
//     //    The build configuration should be outside of the server object.
//   },
  
//   // 4. Build config should be defined here, as a sibling to 'server' and 'plugins'
//   build: {
//     manifest: true,
//     rollupOptions: {
//       input: './client/main.jsx',
//     },
//   },
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 🔑 FIX: Define the Port variable statically or ensure it's exposed correctly.
// For simplicity and reliability, we will define the TARGET_PORT here.
// The default target port for the Express server is 3000.
const EXPRESS_PORT = 3000; 

// https://vite.dev/config/
export default defineConfig({
    root: './client', 
    plugins: [react()],
    
    server: {
        // Vite runs on its own port (e.g., 5173).
        // The proxy forwards requests to the backend server (EXPRESS_PORT).
        proxy: {
            // Target /api and /auth requests to the backend server running on port 3000
            '/api': {
                target: `http://localhost:${EXPRESS_PORT}`,
                changeOrigin: true,
            },
            '/auth': {
                target: `http://localhost:${EXPRESS_PORT}`,
                changeOrigin: true,
            },
            // Note: If you have other API routes (e.g., /img), include them here.
        },
    },
    
    // Build config remains outside the server object
    build: {
        manifest: true,
        rollupOptions: {
            // Ensure this path is correct if your entry file is not main.jsx
            input: './client/main.jsx',
        },
    },
});