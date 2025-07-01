import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

function NavBar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      axios.post("http://localhost:7777/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="sticky top-0 z-50 backdrop-blur-sm bg-[#FFF9FB]/95 shadow-md py-3">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="font-bold text-2xl group relative">
          <span className="text-[#FF6F91] inline-block transition-transform group-hover:translate-y-[-2px] duration-300">
            Campus
          </span>
          <span
            className="text-[#1F1F1F] inline-block transition-transform group-hover:translate-y-[-2px] duration-300"
            style={{ transitionDelay: "50ms" }}
          >
            Crush
          </span>
          <span className="ml-1 inline-block heartbeat">💌</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-campus-gradient-animated group-hover:w-full transition-all duration-500"></span>
        </Link>
        {user && (
          <div className="flex items-center fade-in">
            <p className="text-lg font-medium mr-4 text-[#1F1F1F] hidden sm:flex items-center">
              <span className="mr-1">Hi,</span>
              <span className="text-[#FF6F91] font-semibold relative group">
                {user.firstName}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6F91] group-hover:w-full transition-all duration-300"></span>
              </span>
            </p>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF6F91] cursor-pointer hover:border-[#FF3C69] transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6F91]/20 pulse-effect">
                  <img
                    alt="User profile"
                    className="w-full h-full object-cover hover:scale-110 transition-all duration-700"
                    src={user.photoUrl || "https://i.pravatar.cc/300"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF6F91]/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-white rounded-xl z-10 mt-3 w-64 p-3 shadow-xl right-0 border border-[rgba(0,0,0,0.06)] transform origin-top-right transition-all duration-300"
              >
                <li className="mb-1 fade-in" style={{ animationDelay: "50ms" }}>
                  <Link
                    to="/profile"
                    className="px-4 py-3 text-[#1F1F1F] hover:bg-[#FFF9FB] rounded-lg transition-all flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3 text-[#FF6F91]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Profile</span>
                  </Link>
                </li>
                <li
                  className="mb-1 fade-in"
                  style={{ animationDelay: "100ms" }}
                >
                  <Link
                    to="/connections"
                    className="px-4 py-3 text-[#1F1F1F] hover:bg-[#FFF9FB] rounded-lg transition-all flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3 text-[#FF6F91]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span>Connections</span>
                  </Link>
                </li>
                <li
                  className="mb-1 fade-in"
                  style={{ animationDelay: "150ms" }}
                >
                  <Link
                    to="/requests"
                    className="px-4 py-3 text-[#1F1F1F] hover:bg-[#FFF9FB] rounded-lg transition-all flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3 text-[#FF6F91]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>Requests</span>
                  </Link>
                </li>
                <div className="border-t border-[rgba(0,0,0,0.06)] my-1"></div>
                <li className="fade-in" style={{ animationDelay: "200ms" }}>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 text-[#FF3C69] hover:bg-[#FFF9FB] rounded-lg transition-all flex items-center w-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default NavBar;
