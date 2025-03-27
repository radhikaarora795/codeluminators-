
export interface Language {
  id: string;
  name: string;
  code: string;
  flag: string;
}

export const languages: Record<string, Language> = {
  english: {
    id: 'english',
    name: 'English',
    code: 'en-IN',
    flag: '🇬🇧'
  },
  hindi: {
    id: 'hindi',
    name: 'हिन्दी',
    code: 'hi-IN',
    flag: '🇮🇳'
  },
  gujarati: {
    id: 'gujarati',
    name: 'ગુજરાતી',
    code: 'gu-IN',
    flag: '🇮🇳'
  },
  tamil: {
    id: 'tamil',
    name: 'தமிழ்',
    code: 'ta-IN',
    flag: '🇮🇳'
  },
  marathi: {
    id: 'marathi',
    name: 'मराठी',
    code: 'mr-IN',
    flag: '🇮🇳'
  },
  bengali: {
    id: 'bengali',
    name: 'বাংলা',
    code: 'bn-IN',
    flag: '🇮🇳'
  }
};

export const languageList = Object.values(languages);
