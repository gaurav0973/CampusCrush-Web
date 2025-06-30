import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import { useEffect } from "react"
import UseCard from "../components/UseCard"

function Feed() {

    const dispatch = useDispatch()
    const feed = useSelector(store => store.feed)

    const getFeed = async () => {
        try {
            if(feed)
                return
            const res = await axios.get("http://localhost:7777/user/feed", {withCredentials: true})
            dispatch(addFeed(res?.data?.data))
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getFeed()
    }, [])

    if(!feed) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-base-200">
                <p className="text-lg font-semibold">Loading feed...</p>
            </div>
        )
    }

    if (feed.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-base-200">
                <p className="text-lg font-semibold">No new connections found.</p>
            </div>
        )
    }

  return (
    feed && (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4">
        <UseCard user={feed[0]} />
      </div>
    )
  )
}
export default Feed