import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { ChatMessage, LoadingState } from '../types';
import { streamGeminiResponse } from '../services/geminiService';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! Welcome to SOXY. I can help you find the perfect subscription plan. Looking for Him, Her, or a Bundle?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || loadingState === LoadingState.LOADING) return;

    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoadingState(LoadingState.LOADING);

    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    let fullResponse = '';

    await streamGeminiResponse(
      messages, 
      userText, 
      (chunk) => {
        fullResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg.role === 'model') {
            lastMsg.text = fullResponse;
          }
          return newMessages;
        });
      }
    );

    setLoadingState(LoadingState.IDLE);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 md:w-96 rounded-lg shadow-2xl mb-4 overflow-hidden border border-gray-100 flex flex-col transition-all animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-soxy-green p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-terracotta" />
              <div>
                <h3 className="font-bold text-sm">Soxy Specialist</h3>
                <p className="text-[10px] opacity-80">Powered by Gemini AI</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-terracotta transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 bg-oatmeal/30 space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 text-sm rounded-lg leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-soxy-green text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about materials, bundles..."
              className="flex-grow bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-soxy-green transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={loadingState === LoadingState.LOADING}
              className="bg-terracotta text-white p-2 rounded-md hover:bg-terracotta-hover disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 bg-soxy-green text-white rounded-full shadow-lg hover:bg-soxy-green-dark hover:scale-105 transition-all flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};