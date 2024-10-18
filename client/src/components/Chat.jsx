import  { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";
import { getChat } from "../routes"; // Adjust the path to where your routes are defined

const socket = io("http://localhost:5000"); // Ensure this matches your server setup

const ChatModal = ({ isOpen, onClose, queryId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (isOpen && queryId) {
      fetchMessages();
      // Listen for incoming messages
      socket.on("newMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        // Clean up the event listener on unmount
        socket.off("newMessage");
      };
    }
  }, [isOpen, queryId]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(getChat.replace(":queryId", queryId));
      setMessages(response.data.messages);
    } catch (error) {
      toast.error("Error fetching messages");
      console.error(error);
    }
  };

  const handleSendMessage = async (message) => {
    const msg = {
      sender: "user", // or "agent", depending on your use case
      message,
      queryId,
    };

    socket.emit("sendMessage", msg); // Emit the message to the server

    // Optionally, update the state immediately
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5 w-1/3">
            <h2 className="text-xl font-medium mb-4">Chat</h2>
            <div className="overflow-y-auto max-h-60 mb-4">
              {messages.map((msg, index) => (
                <div key={index} className={`my-2 ${msg.sender === "agent" ? "text-left" : "text-right"}`}>
                  <div className={`p-2 rounded-lg ${msg.sender === "agent" ? "bg-blue-200" : "bg-gray-200"}`}>
                    <strong>{msg.sender === "agent" ? "Agent" : "User"}:</strong> {msg.message}
                  </div>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type your message..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value) {
                  handleSendMessage(e.target.value);
                  e.target.value = ""; // Clear input after sending
                }
              }}
              className="border-2 border-gray-300 rounded-lg p-2 w-full"
            />
            <button
              onClick={onClose}
              className="bg-red-500 text-white rounded-lg px-4 py-2 mt-2"
            >
              Close
            </button>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default ChatModal;
