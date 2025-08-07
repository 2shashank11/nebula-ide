import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from 'sonner'

import { Provider } from 'react-redux'
import { store } from './app/store.js'


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster position="bottom-right" expand={false} richColors />
        <App />
      </ThemeProvider>
    </Provider>
  // </StrictMode>,
)
