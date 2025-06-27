const axios = require("axios");

module.exports = async function getResFromPerplexity(prompt, model) {
  const response = await axios.post(
    "https://api.perplexity.ai/chat/completions",
    {
      model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  const explanation = response.data.choices[0].message.content;
  return explanation;
};
