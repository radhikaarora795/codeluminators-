
import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SpeechSynthesisHook {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  hasSynthesisSupport: boolean;
}

export const useSpeechSynthesis = (): SpeechSynthesisHook => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Load voices
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      loadVoices();
      
      // Chrome loads voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const getVoiceForLanguage = useCallback((langCode: string) => {
    // Try to find a voice that matches the language code
    const voice = voices.find(v => v.lang.includes(langCode));
    return voice || null;
  }, [voices]);

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Try to find a voice for the current language
      const voice = getVoiceForLanguage(currentLanguage.code);
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.lang = currentLanguage.code;
      utterance.rate = 1;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  }, [currentLanguage, getVoiceForLanguage]);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    hasSynthesisSupport: 'speechSynthesis' in window
  };
};
