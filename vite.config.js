import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
    plugins: [react()],
    base: '/Alkhatib-Portfolio/', // for github pages path
})