import { useState, useRef, useEffect } from "react";
import axios from "axios";

function AIStudyAssistant() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

   const userMsg = {
    type: "user",
    text: message,
    time: new Date().toLocaleTimeString(),
  };
    setChat((prev) => [...prev, userMsg]);

    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
          "http://localhost:5000/api/ai/chat",
          {
            prompt: message,
          }
      );

      const aiMsg = {
        type: "ai",
        text: res.data.response,
        time: new Date().toLocaleTimeString(),
      };
      setChat((prev) => [...prev, aiMsg]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          type: "ai",
          text: "⚠️ AI Error, try again",
          time: new Date().toLocaleTimeString(),
        },
      ]);
          }

    setLoading(false);
  };
    const bottomRef = useRef(null);

      useEffect(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, [chat]);

      useEffect(() => {
      localStorage.setItem(
        "aiChatHistory",
        JSON.stringify(chat)
      );
      }, [chat]);

      useEffect(() => {
          bottomRef.current?.scrollIntoView({
            behavior: "smooth",
          });
        }, [chat]);

        useEffect(() => {
          localStorage.setItem(
            "aiChatHistory",
            JSON.stringify(chat)
          );
        }, [chat]);

        useEffect(() => {
          const savedChat =
            localStorage.getItem(
              "aiChatHistory"
            );

          if (savedChat) {
            setChat(
              JSON.parse(savedChat)
            );
          }
        }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col">

      {/* HEADER */}
      <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">
            🤖 AI Study Assistant
          </h1>

          <div className="flex gap-2">

            <span className="text-sm text-gray-500">
              Powered by AI
            </span>

            <button
             onClick={() => {
                  setChat([]);
                  localStorage.removeItem(
                    "aiChatHistory"
                  );
                }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
            >
              Clear Chat
            </button>

          </div>
        </div>
      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">

        {chat.length === 0 && (
          <div className="text-center mt-20 text-gray-400">
            <p className="text-lg">Start your learning journey 🚀</p>
            <p className="text-sm">Ask anything related to studies</p>
          </div>
        )}
            {chat.map((c, i) => (
              <div
                key={i}
                className={`flex ${
                  c.type === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl max-w-md shadow-sm text-sm leading-relaxed ${
                    c.type === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-800 border-l-4 border-blue-500 rounded-bl-sm"
                  }`}
                >
                  <p>{c.text}</p>

                  <div className="text-xs mt-2 opacity-70">
                    {c.time}
                  </div>
                </div>
              </div>
            ))}
          <div ref={bottomRef}></div>
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border px-4 py-2 rounded-2xl text-gray-500 text-sm animate-pulse">
              🤖 AI is thinking...
            </div>
          </div>
        )}
      </div>

        {/* QUICK QUESTIONS */}

        <div className="px-4 py-4 flex flex-wrap gap-2 bg-white">

          <button
            onClick={() => setMessage("Explain React")}
            className="bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-lg"
          >
            📚 Explain React
          </button>

          <button
            onClick={() => setMessage("Explain Python")}
            className="bg-green-100 hover:bg-green-200 px-3 py-2 rounded-lg"
          >
            🐍 Explain Python
          </button>

          <button
            onClick={() => setMessage("Explain HTML")}
            className="bg-orange-100 hover:bg-orange-200 px-3 py-2 rounded-lg"
          >
            🌐 Explain HTML
          </button>

          <button
            onClick={() => setMessage("Explain MongoDB")}
            className="bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded-lg"
          >
            🗄️ Explain MongoDB
          </button>

        </div>


      {/* INPUT AREA */}
      <div className="bg-white border-t p-4 flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Ask anything about studies..."
          className="flex-1 border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          Send
        </button>
      </div>

    </div>
  );
}

export default AIStudyAssistant;