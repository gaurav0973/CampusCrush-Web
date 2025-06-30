import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";

function Login() {

    const [emailId , setEmailId] = useState("virat@gmail.com");
    const [password , setPassword] = useState("Virat@123");
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmitBtn = async (e) => {
        e.preventDefault();
        console.log("Email:", emailId);
        console.log("Password:", password);
        // Here you can add your login logic, like calling an API
        const res = await axios.post("http://localhost:7777/login", {
            emailId: emailId,
            password: password
        }, {withCredentials: true})
        dispatch(addUser(res.data.data))
        navigate("/")
        
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-md">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4 text-2xl">Login</h2>

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

          <div className="form-control">
            <button
            onClick={handleSubmitBtn}
            type="submit"
            className="btn btn-primary w-full">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
