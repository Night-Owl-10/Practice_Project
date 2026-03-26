import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <main className='App'>
       <AuthProvider>
          <Header />
          <Outlet />
          <Footer />
          <ToastContainer
              position="top-right" 
              autoClose={3000} 
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light" 
              />
        </AuthProvider>
    </main>
  )
}

export default App
