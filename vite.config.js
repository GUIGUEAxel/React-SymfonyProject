import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Configuration explicite pour la transformation JSX
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
    }),
  ],
});
