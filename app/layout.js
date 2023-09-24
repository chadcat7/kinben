import './globals.css'
import { Dosis } from 'next/font/google'
import Nav from './components/Nav'
import Musy from './components/Musy';
import { AuthContextProvider } from "./context/AuthContext";
import { DataProvider } from './context/DataContext';
import { PomoProvider } from './context/PomoContext';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const dosis = Dosis({ subsets: ['latin'] })

export const metadata = {
  title: 'kinben',
  description: 'organize your life',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dosis.className} overflow-x-hidden flex flex-col h-screen`}>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <DataProvider>
          <AuthContextProvider>
            <PomoProvider>
              <Nav />
              <Musy />
              {children}
            </PomoProvider>
          </AuthContextProvider>
        </DataProvider>
      </body>
    </html>
  )
}
