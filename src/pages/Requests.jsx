import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          "http://localhost:7777/user/request/received",
          {
            withCredentials: true,
          }
        );
        dispatch(addRequest(res?.data?.data));
      } catch (error) {
        console.log("Error fetching requests:", error);
      }
    };

    if (!requests?.length) fetchRequests();
  }, [dispatch, requests]);

  const handleReview = async (status, _id) => {
    try {
      const res = await axios.post(
        `http://localhost:7777/request/review/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Review response:", res);

      dispatch(removeRequest(_id));
    } catch (error) {
      console.error("Error handling review:", error);
    }
  };

  if (!requests) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FFF9FB]">
        <div className="animate-pulse">
          <p className="text-lg font-semibold text-[#1F1F1F]">
            Loading requests...
          </p>
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FFF9FB]">
        <div className="text-center p-8 rounded-xl shadow-md bg-white max-w-md">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-[#FF6F91]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
          <p className="text-lg font-semibold text-[#1F1F1F]">
            No crush requests yet
          </p>
          <p className="text-[#7B7B7B] mt-2">
            When someone shows interest in you, their request will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9FB] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          <span className="text-[#FF6F91]">Crush</span> Requests
        </h1>

        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
          {requests.map((request) => {
            const { firstName, lastName, photoUrl, age, _id, about, gender } =
              request.fromUserId;
            return (
              <div
                key={_id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg"
              >
                <div className="bg-campus-gradient h-1 w-full"></div>
                <div className="p-6">
                  <div className="flex items-start md:items-center flex-col md:flex-row gap-5">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#FF6F91]">
                        <img
                          src={photoUrl || "https://i.pravatar.cc/150"}
                          alt={`${firstName} ${lastName}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-xl font-bold text-[#1F1F1F]">
                        {firstName} {lastName}
                      </h2>
                      <div className="flex items-center mt-1 space-x-2">
                        {age && (
                          <span className="bg-[#FF6F91] bg-opacity-10 text-[#FF6F91] px-2 py-1 rounded-full text-xs font-medium">
                            {age}
                          </span>
                        )}
                        {gender && (
                          <span className="bg-[#6EC5E9] bg-opacity-10 text-[#6EC5E9] px-2 py-1 rounded-full text-xs font-medium">
                            {gender}
                          </span>
                        )}
                      </div>
                      {about && (
                        <p className="text-[#7B7B7B] mt-2 text-sm">{about}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                    <button
                      onClick={() => handleReview("rejected", request._id)}
                      className="bg-white border border-[#7B7B7B] text-[#7B7B7B] font-medium py-2 px-6 rounded-lg hover:bg-[#7B7B7B] hover:text-white transition-colors"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleReview("accepted", request._id)}
                      className="bg-[#FF6F91] text-white font-medium py-2 px-6 rounded-lg hover:bg-[#FF3C69] transition-colors"
                    >
                      Accept Crush
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Requests;
