import React from 'react';
// App.jsx
import '../src/App.css';
import { useState, useRef, useEffect } from 'react';
import { assets } from '../src/assets/assets';

const AiChat = () => {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    { user: "gpt", message: "How can I help you today?" },
    { user: "me", message: "I want to use ChatGpt today" },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesRef = useRef(null);

  // scroll to bottom when new message arrives
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chatLog, loading]);

  // Clear chat and add a friendly starter
  function clearChat() {
    setChatLog([{ user: 'gpt', message: 'How can I help you today?' }]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    // optimistic UI: append user message right away
    const userMessage = { user: 'me', message: text };
    setChatLog(prev => [...prev, userMessage]);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3080/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        let body = null;
        try { 
          body = await response.json(); 
        } 
        catch (e) {
          // ignore JSON parse errors
          console.log(e);
          
        }
        throw new Error(body?.error || `Server returned ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || 'Sorry — I could not create a response.';

      setChatLog(prev => [...prev, { user: 'gpt', message: botReply }]);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to fetch');
      // show an error message in the chat log (non-persistent)
      setChatLog(prev => [...prev, { user: 'gpt', message: 'There was an error generating the response.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-root">
      <aside className="sidebar">
        <div className="brand">
          {/* Place your logo here: replace the <div className="logo"> with an <img src="/path/to/logo.png" /> */}
          {/* <div className="logo">IUA</div> */}
          <img src={assets.logo2} className='object-cover w-10 h-10' alt='iua-logo'/>
          <div className="brand-text">
            <div className="brand-title">PavelGPT</div>
            <div className="brand-sub">Your private assistant</div>
          </div>
        </div>

        <div className="controls">
          <button className="btn btn-new" onClick={clearChat} aria-label="New chat">+ New chat</button>
          <button className="btn btn-clear" onClick={() => setChatLog([])} aria-label="Clear all">Clear all</button>
        </div>

        <div className="footer-note">Built with React • GPT-mini-4</div>
      </aside>

      <main className="main">
        <header className="main-head">
          <div className="main-title">Chat</div>
          <div className="main-actions">
          </div>
        </header>

        <section className="messages" ref={messagesRef}>
          {chatLog.map((m, i) => (
            <ChatMessage key={i} message={m} />
          ))}
        </section>

        <form className="composer" onSubmit={handleSubmit} aria-label="Chat composer">
          {error && <div className="error-banner">{error}</div>}
          <div className="composer-inner">
            <input
              className="composer-input"
              placeholder={loading ? 'Waiting for reply...' : 'Ask PavelGpt'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              aria-label="Message input"
            />
            <button className="send-btn" type="submit" disabled={loading} aria-label="Send message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor" />
              </svg>
            </button>
          </div>
          <div className="composer-hint">Press Enter to send • Responsive and mobile-first</div>
        </form>
      </main>
    </div>
  );
}

function ChatMessage({ message }) {
  const isGpt = message.user === 'gpt';
  return (
    <div className={`message-row ${isGpt ? 'gpt' : 'me'}`}>
      <div className="avatar-circle" aria-hidden>
        {isGpt ? 'AI' : 'ME'}
      </div>
      <div className={`bubble ${isGpt ? 'bubble-gpt' : 'bubble-me'}`}>
        <div className="bubble-text">{message.message}</div>
      </div>
    </div>
  );
}

export default AiChat;
