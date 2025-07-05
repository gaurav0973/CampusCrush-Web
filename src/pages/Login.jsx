import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants/constant.js";
import toastUtils from "../utils/toastUtils.js";

function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogingForm, setIsLogingForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loadingToast = toastUtils.loading("Logging in...");
      const res = await axios.post(
        `${API_BASE_URL}/login`,
        {
          emailId: emailId,
          password: password,
        },
        { withCredentials: true }
      );
      toastUtils.dismiss(loadingToast);
      toastUtils.success("Login successful!");
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (error) {
      toastUtils.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const loadingToast = toastUtils.loading("Creating account...");
      const res = await axios.post(
        `${API_BASE_URL}/signup`,
        {
          emailId: emailId,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
        { withCredentials: true }
      );
      toastUtils.dismiss(loadingToast);
      toastUtils.success("Account created successfully!");
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      toastUtils.error(
        error.response?.data?.message || "Sign up failed. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 relative overflow-hidden emoji-bg bg-gradient-to-br from-[#FFECF2] via-[#FFF9FB] to-[#F0F9FF]">
      {/* Modern background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-gradient-to-r from-[#FF6F91]/20 to-[#FF3C69]/10 blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full bg-gradient-to-l from-[#6EC5E9]/20 to-[#89D4F1]/10 blur-3xl"></div>
        <div className="absolute top-1/4 right-1/3 w-40 h-40 rounded-full bg-gradient-to-tr from-[#FF8EA6]/10 to-[#FFB5C1]/5 blur-2xl"></div>

        {/* Floating emojis */}
        <div
          className="absolute top-[15%] left-[10%] text-4xl float-animation"
          style={{ animationDelay: "0.5s" }}
        >
          ✨
        </div>
        <div
          className="absolute bottom-[20%] right-[15%] text-4xl float-animation"
          style={{ animationDelay: "1.2s" }}
        >
          💕
        </div>
        <div
          className="absolute top-[35%] right-[10%] text-3xl float-animation"
          style={{ animationDelay: "2.1s" }}
        >
          🔥
        </div>
        <div
          className="absolute bottom-[35%] left-[20%] text-3xl float-animation"
          style={{ animationDelay: "1.8s" }}
        >
          ✌️
        </div>
      </div>

      <div className="w-full max-w-md z-10 fade-in">
        <div className="text-center mb-8 slide-up">
          <div className="inline-block relative">
            <h1 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-[#FF3C69] to-[#FF8EA6] text-transparent bg-clip-text">
              Campus<span className="font-black">Crush</span>
            </h1>
            <span className="absolute -right-8 -top-3 text-4xl rotate-emoji-animation">
              �
            </span>
          </div>
          <p className="text-[#7B7B7B] mt-3 text-lg">
            Find your perfect campus match
          </p>
        </div>

        <div className="glassmorphism rounded-2xl shadow-2xl p-8 transition-all duration-500 border-t border-l border-white/20">
          <div className="relative mb-8">
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-[#FF3C69] to-[#FF8EA6] text-transparent bg-clip-text slide-up">
              {isLogingForm ? "Welcome Back! 👋" : "Create Your Account ✨"}
            </h2>
            <div className="w-20 h-1.5 bg-campus-gradient-animated mx-auto mt-3 rounded-full"></div>
          </div>

          {!isLogingForm && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 bg-gradient-to-r from-[#FF3C69] to-[#FF8EA6] text-transparent bg-clip-text">
                  First Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    className="w-full px-3 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-inner focus:outline-none focus:border-[#FF6F91] focus:ring-2 focus:ring-[#FF6F91]/20 transition-all text-[#1F1F1F] group-hover:shadow-lg pl-9"
                  />
                  <span className="absolute left-3 top-3.5">👤</span>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 bg-gradient-to-r from-[#FF3C69] to-[#FF8EA6] text-transparent bg-clip-text">
                  Last Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="w-full px-3 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-inner focus:outline-none focus:border-[#FF6F91] focus:ring-2 focus:ring-[#FF6F91]/20 transition-all text-[#1F1F1F] group-hover:shadow-lg pl-9"
                  />
                  <span className="absolute left-3 top-3.5">👤</span>
                </div>
              </div>
            </div>
          )}

          <div className="mb-4 slide-up" style={{ animationDelay: "0.2s" }}>
            <label className="block text-sm font-medium mb-1 bg-gradient-to-r from-[#FF3C69] to-[#FF8EA6] text-transparent bg-clip-text">
              Email
            </label>
            <div className="relative group">
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-3 pl-10 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-inner focus:outline-none focus:border-[#FF6F91] focus:ring-2 focus:ring-[#FF6F91]/20 transition-all text-[#1F1F1F] group-hover:shadow-lg"
              />
              <span className="absolute left-3 top-3.5">📧</span>
            </div>
          </div>

          <div className="mb-6 slide-up" style={{ animationDelay: "0.3s" }}>
            <label className="block text-sm font-medium mb-1 bg-gradient-to-r from-[#FF3C69] to-[#FF8EA6] text-transparent bg-clip-text">
              Password
            </label>
            <div className="relative group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-3 pl-10 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-inner focus:outline-none focus:border-[#FF6F91] focus:ring-2 focus:ring-[#FF6F91]/20 transition-all text-[#1F1F1F] group-hover:shadow-lg"
              />
              <span className="absolute left-3 top-3.5">🔒</span>
            </div>
          </div>

          <button
            onClick={isLogingForm ? handleLogin : handleSignUp}
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF3C69] to-[#FF8EA6] text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 mb-6 slide-up btn-ripple hover:shadow-lg hover:shadow-[#FF6F91]/20 transform hover:-translate-y-1"
            style={{ animationDelay: "0.4s" }}
          >
            {isLogingForm ? (
              <span className="flex items-center justify-center text-lg">
                <span className="mr-2">🚀</span>
                Login
              </span>
            ) : (
              <span className="flex items-center justify-center text-lg">
                <span className="mr-2">✨</span>
                Sign Up
              </span>
            )}
          </button>

          <div
            className="text-center slide-up"
            style={{ animationDelay: "0.5s" }}
          >
            <button
              onClick={() => setIsLogingForm((isLogingForm) => !isLogingForm)}
              type="button"
              className="text-[#FF6F91] hover:text-[#FF3C69] font-medium transition-all duration-300 relative group bg-white/30 px-4 py-2 rounded-full hover:bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm"
            >
              {isLogingForm ? (
                <span className="flex items-center">
                  <span className="mr-1">🤩</span>
                  Create a new account
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="mr-1">👋</span>
                  Already have an account?
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Trendy visual element */}
        <div
          className="mt-8 flex justify-center opacity-80 slide-up"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#FF3C69] animate-pulse"></div>
            <div
              className="w-2 h-2 rounded-full bg-[#FF6F91] animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-[#FF8EA6] animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Gen Z style footer */}
      <div className="absolute bottom-4 text-center w-full text-sm text-[#7B7B7B] flex flex-col items-center">
        <div className="flex items-center space-x-2 mb-1">
          <span>Made with</span>
          <span className="heartbeat text-lg">❤️</span>
          <span>for college students</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
