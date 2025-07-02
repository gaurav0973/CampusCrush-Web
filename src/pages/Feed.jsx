import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UseCard from "../components/UseCard";
import { API_BASE_URL } from "../constants/constant.js";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(`${API_BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-campus-light">
        <div className="animate-pulse">
          <p className="text-lg font-semibold text-[#1F1F1F]">
            Loading feed...
          </p>
        </div>
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-campus-light">
        <div className="text-center p-8 rounded-xl shadow-md bg-white">
          <p className="text-lg font-semibold text-[#1F1F1F]">
            No new connections found.
          </p>
          <p className="text-[#7B7B7B] mt-2">
            Check back later for new campus crushes!
          </p>
        </div>
      </div>
    );
  }

  return (
    feed && (
      <div className="flex flex-col items-center justify-center min-h-screen bg-campus-light px-4 py-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#1F1F1F]">
            <span className="text-[#FF6F91]">Campus</span>Crush
          </h2>
          <UseCard user={feed[0]} />
        </div>
      </div>
    )
  );
}
export default Feed;
