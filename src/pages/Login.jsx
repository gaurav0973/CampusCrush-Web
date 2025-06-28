import axios from "axios";
import { useState } from "react";

function Login() {

    const [emailId , setEmailId] = useState("");
    const [password , setPassword] = useState("");

    const handleSubmitBtn = async (e) => {
        e.preventDefault();
        console.log("Email:", emailId);
        console.log("Password:", password);
        // Here you can add your login logic, like calling an API
        await axios.post("http://localhost:7777/login", {
            emailId: emailId,
            password: password
        }, {withCredentials: true})
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
