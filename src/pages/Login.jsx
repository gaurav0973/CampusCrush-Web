import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";

function Login() {

    const [emailId , setEmailId] = useState("virat@gmail.com");
    const [password , setPassword] = useState("Virat@123");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLogingForm, setIsLogingForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
          const res = await axios.post("http://localhost:7777/login", {
            emailId: emailId,
            password: password
          }, {withCredentials: true})
          dispatch(addUser(res.data.data))
          navigate("/")
        } catch (error) {
          setError(error.response?.data?.message || "Login failed. Please try again.");
        } 
        
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:7777/signup", {
            emailId: emailId,
            password: password,
            firstName: firstName,
            lastName: lastName
          }, {withCredentials: true})
          // console.log("sign up called", res.data.data)
          dispatch(addUser(res.data.data))
          return navigate("/profile")
        } catch (error) {
          setError(error.response?.data?.message || "Sign up failed. Please try again.");
          
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF9FB] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-[#FF6F91]">Campus</span>
            <span className="text-[#1F1F1F]">Crush</span>
            <span className="ml-1">💌</span>
          </h1>
          <p className="text-[#7B7B7B]">Find your perfect campus match</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#1F1F1F]">
            {isLogingForm ? "Welcome Back!" : "Create Your Account"}
          </h2>
          
          {!isLogingForm && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#1F1F1F] mb-1">
                  First Name
                </label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name" 
                  className="w-full px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.06)] focus:outline-none focus:border-[#FF6F91]" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#1F1F1F] mb-1">
                  Last Name
                </label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name" 
                  className="w-full px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.06)] focus:outline-none focus:border-[#FF6F91]" 
                />
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#1F1F1F] mb-1">
              Email
            </label>
            <input 
              type="email" 
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter your email" 
              className="w-full px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.06)] focus:outline-none focus:border-[#FF6F91]" 
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1F1F1F] mb-1">
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password" 
              className="w-full px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.06)] focus:outline-none focus:border-[#FF6F91]" 
            />
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <button
            onClick={isLogingForm ? handleLogin : handleSignUp}
            type="submit"
            className="w-full bg-[#FF6F91] hover:bg-[#FF3C69] text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 mb-4">
            {isLogingForm ? "Login" : "Sign Up"}
          </button>
          
          <div className="text-center">
            <button
              onClick={() => setIsLogingForm((isLogingForm) => !isLogingForm)}
              type="button"
              className="text-[#FF6F91] hover:text-[#FF3C69] font-medium transition-colors"
            >
              {isLogingForm ? "Create a new account" : "Already have an account?"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
