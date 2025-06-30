import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:7777/user/request/received", {
          withCredentials: true,
        });
        // console.log("Requests:", res?.data?.data);
        dispatch(addRequest(res?.data?.data));
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    if (!requests?.length) fetchRequests();
  }, [dispatch, requests]);

  if (!requests) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <p className="text-lg font-semibold">Loading requests...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <p className="text-lg font-semibold">No requests found.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-base-100 shadow-md max-w-3xl mx-auto mt-8">
      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, _id, about, gender } = request.fromUserId;
        return (
          <div key={_id} className="card bg-base-100 shadow-sm mb-4">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <img
                  src={photoUrl || "https://i.pravatar.cc/150"}
                  alt={`${firstName} ${lastName}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="card-title text-lg">{firstName} {lastName}</h2>
                  <p className="text-sm text-gray-500">
                    {age && `Age: ${age}`} {gender && `| Gender: ${gender}`}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Requests;
