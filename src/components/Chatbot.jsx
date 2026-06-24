import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import "./Chatbot.css";

// Extract CV Data as a detailed structured text block for system prompt
const systemInstruction = `You are "Windy", the beautiful, friendly, and extremely helpful personal AI chatbot for Vinuda Jayawardhana's portfolio website. 
Your goal is to represent Vinuda perfectly to recruiters, clients, and visitors by answering questions about him based on his CV and portfolio details.

Here is the authentic information about Vinuda Jayawardhana:
- **About Him**: Full stack software engineering undergraduate at the University of Bedfordshire. Enthusiastic, detail-oriented, and skilled in building scalable web and mobile apps.
- **Location**: Ragama, Sri Lanka.
- **Contact Details**: 
  - Email: jayawardhanavinuda@gmail.com
  - Phone: 0711583969 / +94711583969
  - LinkedIn: Vinuda Jayawardhana
  - GitHub: Vinuda Jayawardhana
- **Education**: 
  - BSc (Hons) in Information Technology from SLIIT CITY UNI, Colombo (awarded by University of Bedfordshire).
  - Current Status: Year 02, Semester 02.
  - GPA: 3.85 / 4.00 (Dean's List).
  - Expected Graduation: May 2027.
  - Coursework: Data Structures & Algorithms, OOP (Java), Database Management Systems, Computer Networking, Operating Systems.
- **Professional Experience**:
  - Freelance Developer (Self Employed) from November 2025 – Present. Designed and developed custom software systems for clients to streamline operations and improve workflow efficiency.
- **Key Projects**:
  1. **IconX Mobile Store Management System** (January 2026 - Present): A fully functional e-commerce website for iconX MobileStore (Kalutara). Features include product management, attendance management, salary calculations, customer handling, and PDF reports. Tech: React.js, Node.js, Firebase.
  2. **CardioShield AI** (July 2025 - December 2025): Streamlit web application using machine learning (Linear regression) to predict heart attack risk based on patient body checkup reports. Tech: Python, Streamlit, Scikit-learn.
  3. **TourLanka Android Application** (March 2025 - June 2025): Tourism mobile app featuring destination savers, hotel booking options, and weather forecasts. Tech: HTML, CSS, JavaScript, SQL.
- **Skills**:
  - Programming: Java, C++, C#, Python, Javascript, HTML, PHP.
  - Web & Backend: React.js, Node.js, Express.js, Next.js, Spring Boot.
  - DevOps & Databases: Firebase, SQL, Git, Android Studio, Figma, Canva.
  - Security & Networking: Cisco IOS, Metasploit, Kali Linux, SQLMap.
- **Referees**: 
  - Mr. Ramanaruban Rangan (Lecturer, SLIIT CITY UNI) - ramanaruban@sliit.lk
  - Ms. Samudini Sandalika (Lecturer, SLIIT CITY UNI) - samudini.n@sliit.lk

Guidelines for your responses:
1. Always be polite, professional, and cheerful. State that your name is "Windy".
2. Keep responses relatively concise, readable, and structured. Use bullet points for lists.
3. If a visitor asks about something not covered in his CV, politely redirect them to contact Vinuda directly at jayawardhanavinuda@gmail.com or via his contact form on the page.
4. Avoid any hallucination. If you don't know something, be honest and recommend contacting Vinuda.`;

const VITE_GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyC7jDIMrofqfgB3wNxhceJ6UCJh8PHEYJE";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi there! 👋 I'm Windy, Vinuda's AI assistant. Ask me anything about his projects, skills, education, or how to get in touch!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const userQuery = textToSend || input;
    if (!userQuery.trim()) return;

    // Append user message
    const updatedMessages = [...messages, { role: "user", text: userQuery }];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const chatHistoryContext = updatedMessages
        .map((m) => `${m.role === "user" ? "User" : "Windy"}: ${m.text}`)
        .join("\n");

      const prompt = `${systemInstruction}\n\nChat History:\n${chatHistoryContext}\n\nWindy:`;
      let replyText = "";

      // Check if we have a valid local API key for direct client-side calling (local dev fallback)
      const hasLocalKey = VITE_GEMINI_API_KEY && 
                          VITE_GEMINI_API_KEY.startsWith("AIzaSy") && 
                          VITE_GEMINI_API_KEY !== "AIzaSyC7jDIMrofqfgB3wNxhceJ6UCJh8PHEYJE";

      if (hasLocalKey) {
        const genAI = new GoogleGenerativeAI(VITE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        replyText = result.response.text();
      } else {
        // Secure production route using serverless backend proxy
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        replyText = data.reply;
      }

      setMessages((prev) => [...prev, { role: "bot", text: replyText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Oops! I encountered a connection issue. Please feel free to reach out to Vinuda directly via his email (jayawardhanavinuda@gmail.com).",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const suggestions = [
    "Tell me about Vinuda's projects",
    "What are his programming skills?",
    "Where does he study and GPA?",
    "How can I contact him?",
  ];

  return (
    <div className="windy-chat-widget">
      {isOpen && (
        <div className="windy-drawer">
          {/* Header */}
          <div className="windy-header">
            <div className="windy-header-info">
              <div className="windy-avatar">W</div>
              <div className="windy-title-group">
                <span className="windy-name">Windy</span>
                <span className="windy-status">
                  <span className="windy-status-dot"></span>
                  Online
                </span>
              </div>
            </div>
            <button className="windy-close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="windy-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`windy-msg-row ${msg.role}`}>
                <div className="windy-bubble">{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="windy-msg-row bot">
                <div className="windy-bubble">
                  <div className="windy-typing-indicator">
                    <span className="windy-typing-dot"></span>
                    <span className="windy-typing-dot"></span>
                    <span className="windy-typing-dot"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          {messages.length === 1 && !isTyping && (
            <div className="windy-suggestions">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="windy-chip"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            className="windy-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              type="text"
              className="windy-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              disabled={isTyping}
            />
            <button
              type="submit"
              className="windy-send-btn"
              disabled={isTyping || !input.trim()}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating launcher trigger */}
      <button className="windy-launcher" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}