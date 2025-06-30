import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connections";

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        if (connections?.length) 
          return; 
        const res = await axios.get("http://localhost:7777/user/connections", {
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
        <div className="animate-pulse">
          <p className="text-lg font-semibold text-[#1F1F1F]">Loading connections...</p>
        </div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FFF9FB]">
        <div className="text-center p-8 rounded-xl shadow-md bg-white max-w-md">
          <svg className="w-16 h-16 mx-auto mb-4 text-[#FF6F91]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <p className="text-lg font-semibold text-[#1F1F1F]">No connections found.</p>
          <p className="text-[#7B7B7B] mt-2">Start by exploring profiles and connecting with others!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9FB] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          <span className="text-[#FF6F91]">Your</span> Connections
        </h1>

        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
          {connections.map((connection) => {
            const { firstName, lastName, photoUrl, age, _id, about, gender } = connection;
            return (
              <div key={_id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg">
                <div className="p-6">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#FF6F91]">
                        <img
                          src={photoUrl || "https://i.pravatar.cc/150"}
                          alt={`${firstName} ${lastName}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#1F1F1F]">{firstName} {lastName}</h2>
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
                    </div>
                  </div>
                  {about && (
                    <p className="text-[#7B7B7B] mt-4 text-sm">
                      {about}
                    </p>
                  )}
                  <div className="mt-4 flex justify-end">
                    <button className="bg-white border border-[#FF6F91] text-[#FF6F91] font-medium py-1.5 px-4 rounded-lg hover:bg-[#FF6F91] hover:text-white transition-colors">
                      Message
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

export default Connections;
