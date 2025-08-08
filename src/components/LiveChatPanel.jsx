import React, { useState, useEffect } from 'react';

const LiveChatCanvas = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { user: true, text: input }]);
      setInput('');
      setTimeout(() => {
        setMessages(prev => [...prev, { user: false, text: "Thanks! We're here to help." }]);
      }, 700);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  useEffect(() => {
    const container = document.getElementById('chatMessages');
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages]);

  return (
    <div className="d-flex flex-column h-100">
      {/* Chat Header */}
    

      {/* Message Display */}
      <div
        id="chatMessages"
        className="flex-grow-1 overflow-auto mb-3 border rounded p-3"
        style={{ backgroundColor: '#f9f9f9', maxHeight: '420px' }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`d-flex ${msg.user ? 'justify-content-end' : 'justify-content-start'} mb-2`}>
            <span
              className={`badge badge-pill badge-${msg.user ? 'primary' : 'light'} p-2`}
              style={{ maxWidth: '70%', wordWrap: 'break-word' }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <div className="input-group-append">
          <button className="btn btn-success" type="button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveChatCanvas;