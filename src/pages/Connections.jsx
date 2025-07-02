import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connections.js";
import { API_BASE_URL } from "../constants/constant.js";

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        if (connections?.length) return;
        const res = await axios.get(`${API_BASE_URL}/user/connections`, {
          withCredentials: true,
        });
        dispatch(addConnections(res?.data?.data));
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    fetchConnections();
  }, []);

  if (!connections) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FFF9FB]">
        <div className="shimmer rounded-xl p-8 w-full max-w-md">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FFF9FB]">
        <div className="text-center p-8 rounded-xl shadow-md bg-white max-w-md fade-in">
          <div className="pulse-effect">
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          </div>
          <p className="text-lg font-bold text-[#1F1F1F] slide-up">
            No connections found.
          </p>
          <p
            className="text-[#7B7B7B] mt-4 slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Start by exploring profiles and connecting with others!
          </p>
          <button
            className="mt-6 bg-[#FF6F91] text-white font-medium py-2 px-6 rounded-lg hover:bg-[#FF3C69] transition-all duration-300 slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            Find Crushes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9FB] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center fade-in">
          <span className="text-[#FF6F91]">Your</span> Connections
        </h1>

        <div className="w-20 h-1 mx-auto bg-campus-gradient-animated rounded-full mb-8 fade-in"></div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
          {connections.map((connection, index) => {
            const { firstName, lastName, photoUrl, age, _id, about, gender } =
              connection;
            return (
              <div
                key={_id}
                className="bg-white rounded-xl shadow-md overflow-hidden card-hover fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <div className="bg-campus-gradient-animated h-1 w-full"></div>
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#FF6F91] hover:border-[#FF3C69] transition-colors duration-300">
                          <img
                            src={photoUrl || "https://i.pravatar.cc/150"}
                            alt={`${firstName} ${lastName}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#6EC5E9] rounded-full flex items-center justify-center text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-xl font-bold text-[#1F1F1F] group flex items-center">
                          {firstName} {lastName}
                          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-[#FF6F91]"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                          </span>
                        </h2>
                        <div className="flex items-center mt-2 space-x-2">
                          {age && (
                            <span className="bg-[#FF6F91] bg-opacity-10 text-[#FF6F91] px-3 py-1 rounded-full text-xs font-medium hover:bg-[#FF6F91] hover:text-white transition-colors duration-300">
                              {age}
                            </span>
                          )}
                          {gender && (
                            <span className="bg-[#6EC5E9] bg-opacity-10 text-[#6EC5E9] px-3 py-1 rounded-full text-xs font-medium hover:bg-[#6EC5E9] hover:text-white transition-colors duration-300">
                              {gender}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {about && (
                      <div className="bg-[#FFF9FB] rounded-lg p-4 mt-4 relative">
                        <svg
                          className="absolute top-0 left-4 transform -translate-y-3 text-[#FFF9FB]"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 2L4 12h8v10l8-10h-8z"
                            transform="rotate(180, 12, 12)"
                          />
                        </svg>
                        <p className="text-[#7B7B7B] text-sm">{about}</p>
                      </div>
                    )}
                    <div className="mt-5 flex justify-end">
                      <button className="bg-white border border-[#FF6F91] text-[#FF6F91] font-medium py-2 px-5 rounded-lg hover:bg-[#FF6F91] hover:text-white transition-all duration-300 btn-ripple flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                        Message
                      </button>
                    </div>
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

export default Connections;
