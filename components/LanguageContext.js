import { createContext, useContext, useState, useEffect } from 'react';

const LANGUAGES = {
  en: { name: 'English', dir: 'ltr', label: 'EN' },
  zh: { name: '中文', dir: 'ltr', label: '中' },
  ar: { name: 'العربية', dir: 'rtl', label: 'ع' },
  bn: { name: 'বাংলা', dir: 'ltr', label: 'বাং' },
  ku: { name: 'کوردی', dir: 'rtl', label: 'ک' },
};

const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  dir: 'ltr',
  languages: LANGUAGES,
  t: (key) => key,
});

const TRANSLATIONS = {
  en: {
    hero_title: "Huang's Universe",
    hero_sub: "The cosmos was coded for you, star-child",
    ai_guide: "Zara — Your Cosmic Guide",
    ai_placeholder: "Ask the universe anything...",
    solar: "Solar System",
    moon: "Moon Phase",
    blackhole: "Black Hole",
    constellation: "Constellations",
    gallery: "Stardust Gallery",
    apod: "NASA Picture of the Day",
    clock: "Space-Time Clock",
    code: "Cosmic Engine",
    finale: "Grand Finale",
    send: "Send",
    typing: "Zara is channeling stardust...",
    mars_time: "Mars Time",
    earth_time: "Earth Time",
  },
  zh: {
    hero_title: "黄的宇宙",
    hero_sub: "宇宙是为你而编码的，星之孩子",
    ai_guide: "Zara — 你的宇宙向导",
    ai_placeholder: "问宇宙任何问题...",
    solar: "太阳系",
    moon: "月相",
    blackhole: "黑洞",
    constellation: "星座",
    gallery: "星尘画廊",
    apod: "NASA 每日图片",
    clock: "时空时钟",
    code: "宇宙引擎",
    finale: "终曲",
    send: "发送",
    typing: "Zara 正在汇聚星尘...",
    mars_time: "火星时间",
    earth_time: "地球时间",
  },
  ar: {
    hero_title: "كون هوانغ",
    hero_sub: "صُمِّم الكون من أجلكِ، يا طفلة النجوم",
    ai_guide: "زارا — دليلكِ الكوني",
    ai_placeholder: "اسألي الكون أي شيء...",
    solar: "المجموعة الشمسية",
    moon: "طور القمر",
    blackhole: "الثقب الأسود",
    constellation: "الكوكبات",
    gallery: "معرض غبار النجوم",
    apod: "صورة ناسا اليومية",
    clock: "ساعة الزمكان",
    code: "محرك الكون",
    finale: "الخاتمة الكبرى",
    send: "إرسال",
    typing: "زارا تستحضر غبار النجوم...",
    mars_time: "توقيت المريخ",
    earth_time: "توقيت الأرض",
  },
  bn: {
    hero_title: "হুয়াং-এর মহাবিশ্ব",
    hero_sub: "মহাবিশ্ব তোমার জন্যই কোড করা হয়েছে",
    ai_guide: "জারা — তোমার মহাজাগতিক গাইড",
    ai_placeholder: "মহাবিশ্বকে যেকোনো কিছু জিজ্ঞেস করো...",
    solar: "সৌরজগৎ",
    moon: "চন্দ্রকলা",
    blackhole: "কৃষ্ণগহ্বর",
    constellation: "নক্ষত্রমণ্ডল",
    gallery: "তারার ধূলি গ্যালারি",
    apod: "NASA-র দিনের ছবি",
    clock: "মহাকাশ-কাল ঘড়ি",
    code: "মহাজাগতিক ইঞ্জিন",
    finale: "মহাসমাপ্তি",
    send: "পাঠাও",
    typing: "জারা তারার ধূলি সংগ্রহ করছে...",
    mars_time: "মঙ্গল সময়",
    earth_time: "পৃথিবী সময়",
  },
  ku: {
    hero_title: "گەردوونی هوانگ",
    hero_sub: "گەردوون بۆ تۆ کۆدکراوە، منداڵی ئەستێرە",
    ai_guide: "زارا — ڕێنمایەرەکەی گەردوونیت",
    ai_placeholder: "هەر شتێکی لە گەردوون بپرسە...",
    solar: "سیستەمی خۆر",
    moon: "قۆناغی مانگ",
    blackhole: "کوێرەی ڕەش",
    constellation: "کەوکەبەکان",
    gallery: "گەلەریی توزی ئەستێرە",
    apod: "وێنەی ڕۆژانەی NASA",
    clock: "کاتژمێری کات-شوێن",
    code: "ئامیرازی گەردوون",
    finale: "دواین کۆتایی",
    send: "بنێرە",
    typing: "زارا توزی ئەستێرە کۆدەکاتەوە...",
    mars_time: "کاتی مریخ",
    earth_time: "کاتی زەوی",
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('huang-lang') || 'en';
    setLangState(saved);
  }, []);

  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem('huang-lang', l);
  };

  const dir = LANGUAGES[lang]?.dir || 'ltr';

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [lang, dir]);

  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir, languages: LANGUAGES, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
