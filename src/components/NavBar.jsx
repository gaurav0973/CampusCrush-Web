import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">CampusCrush💌</a>
      </div>
      {user &&
      <div className="flex items-center">
        <p className="text-lg font-semibold mr-4">
          {user.firstName}
        </p>
        <div className="dropdown dropdown-end mx-4">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.photoUrl || "https://i.pravatar.cc/300"}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
}
    </div>
  );
}
export default NavBar;
