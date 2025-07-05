/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../constants/constant.js";

function Chat() {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);
  const messagesContainerRef = useRef(null); 

  
const fetchChatMessages = async () => {
  try {
    const chat = await axios.get(`${API_BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });
    console.log("Chat messages:", chat.data.messages);
    
    // Transform API response format to match your component's message format
    const formattedMessages = chat.data.messages.map(msg => ({
      id: msg._id,
      userId: msg.senderId._id,
      targetUserId: targetUserId,
      text: msg.text,
      timestamp: msg.createdAt,
      firstName: msg.senderId.firstName,
      lastName: msg.senderId.lastName
    }));
    
    // Set messages to state
    setMessages(formattedMessages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    setError("Failed to load messages.");
  }
};

  useEffect(()=>{
    fetchChatMessages()
  }, [])




  const getTargetUserInfo = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      const resArray = res?.data?.data;
      const targetUser = resArray.find((user) => user._id === targetUserId);
      if (targetUser) {
        setTargetUser(targetUser);
      }
    } catch (error) {
      console.error("Error fetching target user info:", error);
      setError("Failed to load user information.");
    }
  };

  useEffect(() => {
    getTargetUserInfo();
  }, [targetUserId]);

  function scrollToBottom() {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e?.preventDefault();
    const trimmed = newMessage.trim();
    if (!trimmed) return;

    if (socketRef.current) {
      const messageToSend = {
        id: Date.now().toString(),
        userId: userId,
        targetUserId: targetUserId,
        text: trimmed,
        timestamp: new Date().toISOString(),
        firstName: user.firstName,
      };
      setMessages((prevMessages) => [...prevMessages, messageToSend]);

      socketRef.current.emit("sendMessage", messageToSend);
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageReceived", (message) => {
      console.log("Received message:", message);
      if (message.userId !== userId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off("messageReceived");
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-[#FFF9FB] py-6 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-[rgba(0,0,0,0.06)] p-4 flex items-center">
          <div className="relative mr-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF6F91]">
              <img
                src={targetUser?.photoUrl || "https://i.pravatar.cc/150?img=33"}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#1F1F1F]">
              {targetUser?.firstName || "Loading..."}
            </h2>
          </div>
        </div>

        {/* Messages Container */}
        <div 
          ref={messagesContainerRef}
          className="h-[calc(100vh-280px)] overflow-y-auto p-4 space-y-4 bg-[#FFF9FB]/50"
        >
          {messages.length > 0 ? (  
            messages.map((msg, index) => (
              <div
                key={msg.id || index}
                className={`flex ${
                  msg.userId === userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    msg.userId === userId
                      ? "bg-[#FF6F91] text-white rounded-tr-none"
                      : "bg-white border border-[rgba(0,0,0,0.06)] text-[#1F1F1F] rounded-tl-none"
                  } shadow-sm`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.userId === userId
                        ? "text-white/70"
                        : "text-[#7B7B7B]"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center">
              <p className="text-[#7B7B7B]">No messages yet</p>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-[rgba(0,0,0,0.06)]">
          <form onSubmit={sendMessage} className="flex items-center gap-2">
            <div className="flex-1 rounded-full border border-[rgba(0,0,0,0.06)] bg-[#FFF9FB] px-4 py-2 flex items-center hover:border-[#FF6F91] transition-colors duration-300">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                }}
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-[#1F1F1F] outline-none placeholder:text-[#7B7B7B]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#FF6F91] text-white p-3 rounded-full hover:bg-[#FF3C69] transition-colors duration-300 flex items-center justify-center"
            >
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;