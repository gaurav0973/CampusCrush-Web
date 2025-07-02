import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice.js";
import { API_BASE_URL } from "../constants/constant.js";

function UseCard({ user }) {
  const { firstName, lastName, photoUrl, age, gender, about, _id } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(`${API_BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true });
      dispatch(removeFeed(userId));

    } catch (error) {
      console.error("Error sending request:", error);
    }
  }
  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md fade-in card-hover">
      <div className="relative">
        <div className="bg-campus-gradient-animated h-3 w-full absolute top-0"></div>
        <figure className="relative pt-3 overflow-hidden">
          <img
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
            src={photoUrl || "https://i.pravatar.cc/300"}
            alt={`${firstName || "User"} ${lastName || ""}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </figure>
      </div>
      <div className="p-6 slide-up">
        <h2 className="text-2xl font-bold text-[#1F1F1F] mb-2 relative group">
          {`${firstName || "Unknown"} ${lastName || ""}`}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6F91] group-hover:w-full transition-all duration-300"></span>
        </h2>
        <div className="flex items-center mb-3 slide-up" style={{ animationDelay: '0.1s' }}>
          <span className="bg-[#FF6F91] bg-opacity-10 text-[#000] px-3 py-1 rounded-full text-sm font-medium hover:bg-[#FF6F91] hover:text-white transition-all duration-300">
            {age ? `${age}` : "Age not specified"}
          </span>
          <span className="mx-2 text-[#7B7B7B]">•</span>
          <span className="bg-[#6EC5E9] bg-opacity-10 text-[#000] px-3 py-1 rounded-full text-sm font-medium hover:bg-[#6EC5E9] hover:text-white transition-all duration-300">
            {gender ? `${gender}` : "Gender not specified"}
          </span>
        </div>
        <p className="text-[#7B7B7B] mb-6 slide-up" style={{ animationDelay: '0.2s' }}>
          {about || "No description provided."}
        </p>
        <div className="flex justify-between gap-4 mt-4 slide-up" style={{ animationDelay: '0.3s' }}>
          <button 
            onClick={() => handleSendRequest("ignored", _id)} 
            className="w-1/2 bg-white border border-[#7B7B7B] text-[#7B7B7B] font-medium py-2 px-4 rounded-lg hover:bg-[#7B7B7B] hover:text-white transition-all duration-300 btn-ripple relative overflow-hidden"
          >
            <span className="relative z-10">Skip</span>
          </button>
          <button 
            onClick={() => handleSendRequest("interested", _id)} 
            className="w-1/2 bg-[#FF6F91] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#FF3C69] transition-all duration-300 btn-ripple relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 heartbeat" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Crush
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default UseCard;
