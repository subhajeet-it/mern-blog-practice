// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   server:{
//     proxy:{
//       '/api':{
//         target:'http://localhost:3000',
//         secure:false
//       }
//     }
//   },
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false, // Allow insecure (HTTP) backend
      },
      '/uploadImg': {
        target: 'http://localhost:3000', // Proxy for image upload
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // No rewrite needed as /uploadImg matches the backend path
      },
    },
  },
  plugins: [react()],
});
