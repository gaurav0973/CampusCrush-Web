import { useSelector } from "react-redux"
import EditProfile from "../components/EditProfile"

function Profile() {
    const user = useSelector(store => store.user)
  return user && (
    <div className="bg-[#FFF9FB] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          <span className="text-[#FF6F91]">Your</span> Profile
        </h1>
        <EditProfile user={user}/>
      </div>
    </div>
  )
}
export default Profile