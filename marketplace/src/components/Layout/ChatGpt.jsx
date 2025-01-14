// import React, { useState } from "react";
// import axios from "axios";
// import "../../Styles/ChatGpt.css"; // Add custom styles for responsiveness

// const ChatGpt = () => {
//   const [userInput, setUserInput] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSend = async () => {
//     if (!userInput.trim()) return;

//     const newMessage = { role: "user", content: userInput };
//     setChatHistory((prev) => [...prev, newMessage]);
//     setUserInput(""); // Clear input field
//     setIsLoading(true);

//     try {
//       const { data } = await axios.post(
//         "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBhIfKZ9ywCkHlX-6V9Hd7LDXEKAbPO6VA",
//         {
//           contents: [
//             {
//               parts: [
//                 {
//                   text: userInput,
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
// console.log(data)
//       // Extract response
//       const responseMessage = {
//         role: "bot",
//         content:
//           data?.candidates?.[0]?.content?.parts?.[0].text ||
//           "No response from Gemini.",
//       };
//       setChatHistory((prev) => [...prev, responseMessage]);
//     } catch (error) {
//       console.error("Error communicating with Gemini API:", error.response?.data || error.message);
//       setChatHistory((prev) => [
//         ...prev,
//         { role: "system", content: "Error fetching response. Please try again." },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="chatbot-container">
//       <div className="chat-header">
//         <h2>Gemini ChatBot</h2>
//       </div>
//       <div className="chat-history">
//         {chatHistory.map((message, index) => (
//           <div
//             key={index}
//             className={`chat-message ${message.role === "user" ? "user" : "bot"}`}
//           >
//             <p>{message.content}</p>
//           </div>
//         ))}
//         {isLoading && <div className="loading-indicator">Thinking...</div>}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           placeholder="Ask me something..."
//         />
//         <button onClick={handleSend} disabled={isLoading}>
//           {isLoading ? "Sending..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatGpt;





import React, { useState } from "react";
import axios from "axios";
import "../../Styles/ChatGpt.css";

const ChatGPT = ({setChatVisible}) => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true); // State to toggle chat visibility

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessage = { role: "user", content: userInput };
    setChatHistory((prev) => [...prev, newMessage]);
    setUserInput(""); // Clear input field
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBhIfKZ9ywCkHlX-6V9Hd7LDXEKAbPO6VA",
        {
          contents: [
            {
              parts: [
                {
                  text: userInput,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extract response
      const responseMessage = {
        role: "bot",
        content:
          data?.candidates?.[0]?.content?.parts?.[0].text ||
          "No response from Gemini.",
      };
      setChatHistory((prev) => [...prev, responseMessage]);
    } catch (error) {
      console.error("Error communicating with Gemini API:", error.response?.data || error.message);
      setChatHistory((prev) => [
        ...prev,
        { role: "system", content: "Error fetching response. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setChatVisible(false);
    setIsChatOpen(false); // Close the chat
  };

  if (!isChatOpen) return null; // If chat is closed, don't render anything

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Gemini ChatBot</h2>
        <button className="close-btn" onClick={handleClose}>
          ✖
        </button>
      </div>
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.role === "user" ? "user" : "bot"}`}
          >
            <p>{message.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="loading-text">Gemini is thinking... Please wait.</div>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatGPT;
