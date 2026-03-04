import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <main className='App'>
      <Header />
      <Home />
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
    </main>
  )
}

export default App
