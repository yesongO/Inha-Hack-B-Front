import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  appType: 'spa',
  server: {
    proxy: {
      // /main 으로 시작하는 요청 백엔드로 프록시
      '/main': {
        target: 'https://jinsimin.p-e.kr',
        changeOrigin: true,
        secure: false,
      },
      // /question 으로 시작하는 요청 백엔드로 프록시
      '/question': {
        target: 'https://jinsimin.p-e.kr',
        changeOrigin: true,
        secure: false,
      },
      // /answer 으로 시작하는 요청 백엔드로 프록시
      '/answer': {
        target: 'https://jinsimin.p-e.kr',
        changeOrigin: true,
        secure: false,
      },
      // /api 으로 시작하는 요청 백엔드로 프록시
      '/api': {
        target: 'https://jinsimin.p-e.kr',
        changeOrigin: true,
        secure: false,
      },
    },
    historyApiFallback: true
  },
})