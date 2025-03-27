
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Loader2, 
  Bot, 
  User 
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const { translate, currentLanguage } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI Assistant for government schemes. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    text: speechText, 
    isListening, 
    startListening, 
    stopListening, 
    hasRecognitionSupport,
    clearText 
  } = useSpeechRecognition();
  
  const {
    speak,
    stop: stopSpeaking,
    isSpeaking,
    hasSynthesisSupport
  } = useSpeechSynthesis();
  
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (speechText) {
      setInputValue(speechText);
    }
  }, [speechText]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const toggleMute = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
    setIsMuted(!isMuted);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      clearText();
      startListening();
    }
  };

  const sendMessage = async () => {
    if (inputValue.trim() === '' || isProcessing) return;
    
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    clearText();
    setIsProcessing(true);
    
    // In a real app, this would be an API call to a chatbot service
    // For now, we'll simulate a response after a delay
    setTimeout(() => {
      let botResponse = '';
      
      if (inputValue.toLowerCase().includes('pension')) {
        botResponse = "The National Pension Scheme (NPS) is available for all citizens. To apply, you need to be between 18-60 years of age. You can contribute a minimum of ₹500 per month or ₹6,000 per year.";
      } else if (inputValue.toLowerCase().includes('education') || inputValue.toLowerCase().includes('scholarship')) {
        botResponse = "For education scholarships, check the National Scholarship Portal. Eligibility varies by scheme, but most require family income below ₹6 lakh per annum and good academic performance.";
      } else if (inputValue.toLowerCase().includes('farmer') || inputValue.toLowerCase().includes('agriculture')) {
        botResponse = "PM-KISAN provides income support of ₹6,000 per year to all landholding farmer families. Register through the local agriculture officer or the PM-KISAN portal with your land records and bank account details.";
      } else if (inputValue.toLowerCase().includes('health') || inputValue.toLowerCase().includes('insurance') || inputValue.toLowerCase().includes('medical')) {
        botResponse = "Ayushman Bharat provides health coverage up to ₹5 lakh per family per year. It's available to poor and vulnerable families identified through the SECC database.";
      } else {
        botResponse = "Thank you for your question. To find specific government schemes, please provide details about your area of interest (like education, health, agriculture), your state, and your specific requirements. I can then suggest relevant schemes and eligibility criteria.";
      }
      
      const newBotMessage: Message = {
        id: Date.now(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setIsProcessing(false);
      
      // Speak the response if not muted
      if (!isMuted && hasSynthesisSupport) {
        speak(botResponse);
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <section id="ai-assistant" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            {translate("AI Assistance")}
          </span>
          <h2 className="text-3xl font-bold mt-2">
            {translate("Get Personalized Guidance")}
          </h2>
          <p className="mt-3 text-foreground/70 max-w-2xl mx-auto">
            {translate("Chat with our AI assistant to learn more about government schemes, eligibility criteria, and application processes.")}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            {/* Chat header */}
            <div className="bg-primary text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="w-6 h-6 mr-2" />
                <h3 className="font-medium">
                  {translate("Government Scheme Assistant")}
                </h3>
              </div>
              <div className="text-sm opacity-75">
                {translate("Language")}: {currentLanguage.name}
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="p-4 h-80 overflow-y-auto bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-start mb-1">
                      {message.sender === 'bot' && (
                        <Bot className="w-4 h-4 mr-1 mt-1 flex-shrink-0" />
                      )}
                      {message.sender === 'user' && (
                        <User className="w-4 h-4 mr-1 mt-1 flex-shrink-0" />
                      )}
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <div
                      className={`text-xs ${
                        message.sender === 'user'
                          ? 'text-white/70 text-right'
                          : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 shadow-sm rounded-lg rounded-tl-none p-3 max-w-[80%]">
                    <div className="flex items-center">
                      <Bot className="w-4 h-4 mr-2" />
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Voice capabilities notice */}
            {(!hasRecognitionSupport || !hasSynthesisSupport) && (
              <div className="bg-yellow-50 p-2 text-xs text-yellow-800 text-center">
                {translate("Some voice features may not be available in your browser.")}
              </div>
            )}
            
            {/* Input area */}
            <div className="p-3 border-t border-gray-200">
              <div className="flex items-center">
                <button
                  onClick={toggleListening}
                  disabled={!hasRecognitionSupport}
                  className={`p-2 rounded-full mr-2 transition-colors ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${!hasRecognitionSupport ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={
                    isListening
                      ? translate("Stop listening")
                      : translate("Start voice input")
                  }
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>
                
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isListening
                      ? translate("Listening...")
                      : translate("Type your message or use voice input...")
                  }
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={isListening}
                />
                
                <button
                  onClick={toggleMute}
                  className={`p-2 rounded-full mx-2 bg-gray-100 hover:bg-gray-200 transition-colors ${
                    isMuted ? 'text-gray-400' : 'text-gray-700'
                  }`}
                  title={
                    isMuted
                      ? translate("Unmute responses")
                      : translate("Mute responses")
                  }
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                
                <button
                  onClick={sendMessage}
                  disabled={inputValue.trim() === '' || isProcessing}
                  className={`p-2 rounded-full bg-primary text-white ${
                    inputValue.trim() === '' || isProcessing
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-primary/90'
                  }`}
                  title={translate("Send message")}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              
              {isListening && (
                <div className="mt-2 px-2 text-sm text-primary animate-pulse">
                  {translate("Listening...")} {speechText}
                </div>
              )}
            </div>
          </div>
          
          {/* Voice commands help */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h3 className="text-sm font-medium mb-2">{translate("Example Voice Commands:")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center text-foreground/70">
                <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
                {translate("Tell me about pension schemes")}
              </div>
              <div className="flex items-center text-foreground/70">
                <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
                {translate("What are the education scholarships available?")}
              </div>
              <div className="flex items-center text-foreground/70">
                <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
                {translate("Help for farmers in Kerala")}
              </div>
              <div className="flex items-center text-foreground/70">
                <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2">4</span>
                {translate("Health insurance schemes for my family")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
