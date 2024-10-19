import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';  // Import file ngôn ngữ tiếng Anh
import vi from '../locales/vi.json';  // Import file ngôn ngữ tiếng Việt

i18n
  .use(initReactI18next) // Khởi tạo cho React
  .init({
    resources: {
      en: {
        translation: en,
      },
      vi: {
        translation: vi,
      },
    },
    lng: 'vi',  // Ngôn ngữ mặc định là tiếng Việt
    fallbackLng: 'en', // Nếu không tìm thấy ngôn ngữ, sẽ mặc định dùng tiếng Anh
    interpolation: {
      escapeValue: false, // React đã tự động escape
    },
  });

export default i18n;
