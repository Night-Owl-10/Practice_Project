import SignIn from "./SignIn"
import SignUp from "./SignUp";
import { useState } from "react"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

function Header() {

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, setUser } = useContext(AuthContext)!;

  async function handleSignOut() {

    try {
      const response =  await axios.post("http://localhost:5000/api/users/logout", {}, {withCredentials: true});
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setUser(null);
      window.location.reload();
    } catch (error) {
      toast.error("Error signing out. Please try again.");
    }  
  }

  return (
    <header className="h-16 border border-gray-300 shadow-gray-400 shadow-md rounded-lg w-full flex justify-between items-center gap-4 px-8">
        <div className="flex justify-center items-center gap-4 px-4">
        <div className="h-8 w-8 rounded-full overflow-hidden">
            <img src="/vite.svg" className="h-full w-full object-cover" alt="Vite logo" />
        </div>
        <h1 className="text-2xl font-semibold">Multi App</h1>
        </div>
        <SignIn isSignInOpen={isSignInOpen} setIsSignInOpen={setIsSignInOpen} />
        <SignUp isSignUpOpen={isSignUpOpen} setIsSignUpOpen={setIsSignUpOpen} />
        <div className="relative">
            <div className="h-12 w-12 rounded-full overflow-hidden flex justify-center items-center cursor-pointer" onClick={() => setDropdownOpen(prev => !prev)}>
                <img src={user ? user.avatar : "https://res.cloudinary.com/dru7e6cnq/image/upload/v1772469031/contact-icon-illustration-isolated_23-2151903337_yugu2r.jpg"} className="h-full w-full object-cover" alt="Vite logo" />
            </div>
            {
                dropdownOpen && (
                    <div className="absolute top-10 right-0 z-10 bg-white border border-gray-300 rounded-md shadow-md w-40 flex flex-col">
                        {!user && <button onClick={() => {
                            setIsSignInOpen(true);
                            setDropdownOpen(false);
                        }} className="px-4 py-2 hover:bg-gray-100 text-left">Sign In</button>}
                        {!user && <button onClick={() => {
                            setIsSignUpOpen(true);
                            setDropdownOpen(false);
                        }} className="px-4 py-2 hover:bg-gray-100 text-left">Sign Up</button>}
                        {user && <button onClick={() => {
                            handleSignOut();
                            setDropdownOpen(false);
                        }} className="px-4 py-2 hover:bg-gray-100 text-left">Sign Out</button>}
                    </div>
                )
            }
        </div>
    </header>
  )
}

export default Header