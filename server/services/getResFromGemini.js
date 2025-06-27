const GEMENI_KEY = process.env.GEMENI_KEY; // Using the key from env.js

module.exports = async function getResFromGemini(text) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMENI_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text }],
          },
        ],
      }),
    }
  );

  const data = await res.json();
  console.log("Gemini API Response:", data);
  return data.candidates[0].content.parts[0].text;
};
