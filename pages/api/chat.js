
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "user", content: `Reply in Hinglish (Hindi language but written in English letters): ${prompt}` }
        ]
      })
    });

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2)); // Debug print
    const reply = data?.choices?.[0]?.message?.content || "Sorry, koi response nahi mila.";
    return res.status(200).json({ reply });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}
