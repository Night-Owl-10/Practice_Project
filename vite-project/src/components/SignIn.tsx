import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/Dialog"
import { useState } from "react"
import API from "../api/axios"
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


type SignInProps = {
  isSignInOpen: boolean;
  setIsSignInOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignIn({ isSignInOpen, setIsSignInOpen }: SignInProps) {

  const { setUser } = useContext(AuthContext)!;

  const [logInInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginInfo({ ...logInInfo, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (logInInfo.email.trim() === "" || logInInfo.password.trim() === "") {
      toast.error("All fields are required");
      return;
    }
    try {
      const response = await API.post("/users/login", logInInfo);
      toast.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      logInInfo.email = "";
      logInInfo.password = "";
      setIsSignInOpen(false);
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  }

  return (
    <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
      <DialogContent className="w-[300px] xs:w-100">
        <DialogTitle>Sign In</DialogTitle>
        <DialogDescription>
          Please enter your credentials to sign in.
        </DialogDescription>
        <form onSubmit={handleSubmit} className="mt-4">
          <input type="email" placeholder="Email" name="email" value={logInInfo.email} onChange={(e) => handleChange(e)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" />
          <input type="password" placeholder="Password" name="password" value={logInInfo.password} onChange={(e) => handleChange(e)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" />
          <div className="flex justify-center items-center gap-4 mt-4">
            <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign In</button>
            <DialogClose asChild>
              <button className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">Cancel</button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SignIn;