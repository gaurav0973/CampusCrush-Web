import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

function NavBar() {


  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    try {
      axios.post("http://localhost:7777/logout", {}, { withCredentials: true });
      dispatch(removeUser())
      return navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
  return (
    <div className="sticky top-0 z-50 bg-[#FFF9FB] shadow-sm py-3">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="font-bold text-2xl">
          <span className="text-[#FF6F91]">Campus</span>
          <span className="text-[#1F1F1F]">Crush</span>
          <span className="ml-1">💌</span>
        </Link>
        {user &&
        <div className="flex items-center">
          <p className="text-lg font-medium mr-4 text-[#1F1F1F] hidden sm:block">
            Hi, {user.firstName}
          </p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="relative"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FF6F91] cursor-pointer hover:opacity-90 transition-opacity duration-200">
                <img
                  alt="User profile"
                  className="w-full h-full object-cover"
                  src={user.photoUrl || "https://i.pravatar.cc/300"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-white rounded-xl z-10 mt-3 w-56 p-3 shadow-lg right-0 border border-[rgba(0,0,0,0.06)]"
            >
              <li className="mb-1">
                <Link to="/profile" className="px-4 py-2 text-[#1F1F1F] hover:bg-[#FFF9FB] rounded-lg transition-colors">
                  <span>Profile</span>
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/connections" className="px-4 py-2 text-[#1F1F1F] hover:bg-[#FFF9FB] rounded-lg transition-colors">
                  <span>Connections</span>
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/requests" className="px-4 py-2 text-[#1F1F1F] hover:bg-[#FFF9FB] rounded-lg transition-colors">
                  <span>Requests</span>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="px-4 py-2 text-[#FF3C69] hover:bg-[#FFF9FB] rounded-lg transition-colors">
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      }
      </div>
    </div>
  );
}
export default NavBar;
