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
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl || "https://i.pravatar.cc/300"}
          alt={`${firstName || "User"} ${lastName || ""}`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName || "Unknown"} ${lastName || ""}`}</h2>
        <p>
          {age ? `${age}` : "Age not specified"} |{" "}
          {gender ? `${gender}` : "Gender not specified"}
        </p>
        <p>{about || "No description provided."}</p>
        <div className="card-actions justify-between">
          <button onClick={() => handleSendRequest("ignored", _id)} className="btn btn-primary">Ignore</button>
          <button onClick={() => handleSendRequest("interested", _id)} className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
}
export default UseCard;
