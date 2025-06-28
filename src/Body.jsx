import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

function Body() {
  return (
    <>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </>
  )
}
export default Body