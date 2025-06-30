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
        if (connections?.length) return; // prevent re-fetch if already present
        const res = await axios.get("http://localhost:7777/user/connections", {
          withCredentials: true,
        });
        console.log("fetch connections called", res?.data?.data.length);
        dispatch(addConnections(res?.data?.data));
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    fetchConnections();
  }, [dispatch, connections]);

  if (!connections) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <p className="text-lg font-semibold">Loading connections...</p>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <p className="text-lg font-semibold">No connections found.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-base-100 shadow-md max-w-3xl mx-auto mt-8">
      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, _id, about, gender } = connection;
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
                  {age && <p className="text-sm text-gray-500">{age}</p>}
                  {gender && <p className="text-sm text-gray-500">{gender}</p>}
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

export default Connections;
