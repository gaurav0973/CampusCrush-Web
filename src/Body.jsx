import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";
import { API_BASE_URL } from "./constants/constant.js";

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (error) {
      navigate("/login");
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default Body;
