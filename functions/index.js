const { onRequest } = require("firebase-functions/v2/https");
const { defineString } = require("firebase-functions/params");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Define the API key parameter
const geminiApiKey = defineString("GEMINI_API_KEY");

exports.frankChat = onRequest({ cors: true }, async (req, res) => {
  // Use .value() to access the parameter at runtime
  const apiKey = geminiApiKey.value();
  
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { message } = req.body;
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemInstruction = `You are the professional, frank, and honest AI assistant for Vinuda Jayawardhana. 
    Vinuda is a Software Engineering student. 
    Answer questions directly, concisely, and honestly based on his skills in Java, Python, C++, Android/Web Dev, and AI projects. 
    If a user asks about something you don't know, tell them to contact Vinuda directly. Do not hallucinate.`;

    const result = await model.generateContent(systemInstruction + " " + message);
    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ reply: "I'm having trouble thinking right now." });
  }
});