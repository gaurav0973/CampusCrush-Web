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
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-md">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4 text-2xl">{isLogingForm ? "Login" : "Sign Up"}</h2>
          {!isLogingForm && <>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input 
            type="text" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name" 
            className="input input-bordered w-full" />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input 
            type="text" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name" 
            className="input input-bordered w-full" />
          </div>
          </>}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input 
            type="email" 
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Enter your email" 
            className="input input-bordered w-full" />
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password" 
            className="input input-bordered w-full" />
          </div>
          <p className="text-red-500">{error}</p>

          <div className="form-control">
            <button
            onClick={isLogingForm ? handleLogin : handleSignUp}
            type="submit"
            className="btn btn-primary w-full">{isLogingForm ? "Login" : "Sign Up"}</button>
          </div>
          <div className="form-control">
            <button
              onClick={() => setIsLogingForm((isLogingForm) => !isLogingForm)}
              type="button"
              className="btn btn-link w-full"
            >
              {isLogingForm ? "Create an account" : "Already have an account?"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
