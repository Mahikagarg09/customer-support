import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";
import { getChat, addQuery } from "../routes"; // Ensure to import addQuery for sending messages

const socket = io("http://localhost:5000"); // Ensure this matches your server setup

const ChatModal = ({queryId,isOpen,setModalOpen}) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  // Fetch user ID from local storage
  const userId = JSON.parse(localStorage.getItem("branchInternational"))?._id;

  useEffect(() => {
    if (isOpen && queryId) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(getChat.replace(":queryId", queryId));
          setMessages(response.data.messages); // Assuming the response has messages
        } catch (error) {
          toast.error("Error fetching messages");
          console.error(error);
        }
      };      
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

  const handleSendMessage = async () => {
    if (!currentMessage) return; // Don't send if the input is empty

    const msg = {
      sender: `${userId}`, // or "agent", depending on your use case
      message: currentMessage,
      userId, // Include the user ID
      queryId,
    };

    try {
      const response = await axios.post(addQuery, msg); // Send message to the add route

      if (response.data.message === 'Message saved successfully') {
        // Emit the message to notify other clients
        socket.emit("sendMessage", msg);

        // Update the messages state to include the newly sent message
        setMessages((prevMessages) => [...prevMessages, msg]);
        setCurrentMessage(""); // Clear input after sending
      } else {
        toast.error("Error saving the message: " + response.data.message);
      }
    } catch (error) {
      toast.error("Failed to send message");
      console.error(error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5 w-1/3">
            <h2 className="text-xl font-medium mb-4">Chat</h2>
            <div className="overflow-y-auto max-h-60 mb-4">
              {messages.map((msg, index) => {
                const isUserMessage = msg.sender === userId; // Check if the message is from the user
                return (
                  <div key={index} className={`my-2 ${isUserMessage ? "text-right" : "text-left"}`}>
                    <div
                      className={`p-2 rounded-lg ${isUserMessage ? "bg-green-200" : "bg-blue-200"}`}
                      style={{ display: 'inline-block', maxWidth: '80%' }}
                    >
                      <strong>{isUserMessage ? "You" : "Agent"}:</strong> {msg.message}
                    </div>
                  </div>
                );
              })}
            </div>
            <input
              type="text"
              placeholder="Type your message..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)} // Update input value
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              className="border-2 border-gray-300 rounded-lg p-2 w-full"
            />
            <button
              onClick={() => setModalOpen(false)}
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
