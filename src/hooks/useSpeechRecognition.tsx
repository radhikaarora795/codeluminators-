
import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../assets/languages';

interface SpeechRecognitionHook {
  text: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  hasRecognitionSupport: boolean;
  clearText: () => void; // Add the missing clearText function
}

export const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [hasRecognitionSupport, setHasRecognitionSupport] = useState(false);
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognitionAPI();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      
      setRecognition(recognitionInstance);
      setHasRecognitionSupport(true);
    }
  }, []);

  useEffect(() => {
    if (recognition) {
      // Set the language based on the currentLanguage.id instead of comparing with strings
      switch (currentLanguage.id) {
        case 'hindi':
          recognition.lang = 'hi-IN';
          break;
        case 'gujarati':
          recognition.lang = 'gu-IN';
          break;
        case 'tamil':
          recognition.lang = 'ta-IN';
          break;
        case 'marathi':
          recognition.lang = 'mr-IN';
          break;
        case 'bengali':
          recognition.lang = 'bn-IN';
          break;
        default:
          recognition.lang = 'en-IN';
      }
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setText(transcript);
      };
      
      recognition.onerror = (event: SpeechRecognitionError) => {
        console.error('Speech recognition error', event.error);
        stopListening();
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, [recognition, currentLanguage]);
  
  const startListening = useCallback(() => {
    setText('');
    if (recognition) {
      try {
        recognition.start();
        setIsListening(true);
      } catch (error) {
        console.error('Speech recognition error:', error);
      }
    }
  }, [recognition]);
  
  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);
  
  // Add the clearText function implementation
  const clearText = useCallback(() => {
    setText('');
  }, []);
  
  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
    clearText
  };
};

export default useSpeechRecognition;
