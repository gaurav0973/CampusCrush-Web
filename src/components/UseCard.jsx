import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice.js";

function UseCard({ user }) {
  const { firstName, lastName, photoUrl, age, gender, about, _id } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(`http://localhost:7777/request/send/${status}/${userId}`, {}, { withCredentials: true });
      dispatch(removeFeed(userId));

    } catch (error) {
      console.error("Error sending request:", error);
    }
  }
  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md transition-transform duration-300 hover:shadow-lg">
      <div className="relative">
        <div className="bg-campus-gradient h-3 w-full absolute top-0"></div>
        <figure className="relative pt-3">
          <img
            className="w-full h-64 object-cover"
            src={photoUrl || "https://i.pravatar.cc/300"}
            alt={`${firstName || "User"} ${lastName || ""}`}
          />
        </figure>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#1F1F1F] mb-2">{`${firstName || "Unknown"} ${lastName || ""}`}</h2>
        <div className="flex items-center mb-3">
          <span className="bg-[#FF6F91] bg-opacity-10 text-[#FF6F91] px-3 py-1 rounded-full text-sm font-medium">
            {age ? `${age}` : "Age not specified"}
          </span>
          <span className="mx-2 text-[#7B7B7B]">•</span>
          <span className="bg-[#6EC5E9] bg-opacity-10 text-[#6EC5E9] px-3 py-1 rounded-full text-sm font-medium">
            {gender ? `${gender}` : "Gender not specified"}
          </span>
        </div>
        <p className="text-[#7B7B7B] mb-6">{about || "No description provided."}</p>
        <div className="flex justify-between gap-4 mt-4">
          <button 
            onClick={() => handleSendRequest("ignored", _id)} 
            className="w-1/2 bg-white border border-[#7B7B7B] text-[#7B7B7B] font-medium py-2 px-4 rounded-lg hover:bg-[#7B7B7B] hover:text-white transition-colors duration-200"
          >
            Skip
          </button>
          <button 
            onClick={() => handleSendRequest("interested", _id)} 
            className="w-1/2 bg-[#FF6F91] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#FF3C69] transition-colors duration-200"
          >
            Crush
          </button>
        </div>
      </div>
    </div>
  );
}
export default UseCard;
