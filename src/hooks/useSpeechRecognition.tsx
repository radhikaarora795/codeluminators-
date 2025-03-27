
import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SpeechRecognitionHook {
  text: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  hasRecognitionSupport: boolean;
  clearText: () => void;
}

export const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [text, setText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = currentLanguage.code;
      
      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setText(transcript);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [currentLanguage]);

  const startListening = useCallback(() => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  const clearText = useCallback(() => {
    setText('');
  }, []);

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
    clearText
  };
};
