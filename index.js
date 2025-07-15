import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');

  const handleAsk = async () => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    setReply(data.reply);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1>🗣️ DeepSeek Hinglish Chatbot</h1>
      <input 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        placeholder="Apna question likho Hinglish me..."
      />
      <button onClick={handleAsk} style={{ padding: '10px 20px', marginTop: '10px' }}>
        Ask
      </button>
      {reply && (
        <div style={{ marginTop: '20px', background: '#f1f1f1', padding: '10px' }}>
          {reply}
        </div>
      )}
    </div>
  );
}
