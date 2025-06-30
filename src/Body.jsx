import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addUser } from "./utils/userSlice"
import { useEffect } from "react"

function Body() {

  const dispatch = useDispatch()

  const fetchUser = async () => {
    try {

      const res = await axios.get("http://localhost:7777/profile/view", { withCredentials: true })
      dispatch(addUser(res.data.data))
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }


  useEffect(()=>{
    fetchUser()
  }, [])
  return (
    <>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </>
  )
}
export default Body