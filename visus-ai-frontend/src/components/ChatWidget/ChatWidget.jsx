import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import LogoVisus from '../../assets/Logo.svg';
import axios from 'axios';
import './ChatWidget.css'; 

const ChatWidget = () => {
  // --- 1. TODOS OS HOOKS DEVEM FICAR AQUI EM CIMA ---
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const location = useLocation();
  const messagesEndRef = useRef(null); // <--- O useRef subiu para cá

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // --- 2. LÓGICA DE FUNÇÕES ---
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // ATENÇÃO: Usei 'authToken' aqui para bater com seu AppRoutes
      const token = localStorage.getItem('authToken'); 

      const response = await axios.post('https://visus-ai.duckdns.org/api/ai/chat', 
        { question: userMessage.text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const botAnswer = response.data.data.answer;
      setMessages(prev => [...prev, { text: botAnswer, sender: 'bot' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: "Erro ao conectar com a IA.", sender: 'bot', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. SÓ AGORA PODEMOS DAR O RETURN NULL (CONDICIONAL) ---
  const hiddenRoutes = ['/login', '/register', '/', '/forgot-password'];
  
  if (hiddenRoutes.includes(location.pathname)) {
    return null; // Agora é seguro retornar null aqui
  }

  // --- 4. RENDERIZAÇÃO ---
  return (
    <div className="visus-chat-wrapper">
      {isOpen && (
        <div className="visus-chat-window">
          <div className="chat-header">
            <h3> <img src={LogoVisus} alt="Logo VisusAI" className="chat-visus-logo" /> Assistente Visus</h3>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          
          <div className="chat-body">
            {messages.length === 0 && (
              <div className="welcome-msg">
                Olá! Sou a IA do Protocolo Visus. Dúvidas sobre diagnóstico?
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && <div className="message bot loading">Digitando...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua dúvida..."
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading}>➤</button>
          </div>
        </div>
      )}

      <button 
        className="visus-chat-fab"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>
    </div>
  );
};

export default ChatWidget;