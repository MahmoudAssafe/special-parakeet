
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'ar' | 'en' | 'fr' | 'es' | 'tr';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
};

// Translations
const translationsData: Record<Language, Record<string, string>> = {
  ar: {
    // Arabic translations
    'live': 'البث المباشر الآن',
    'viewers': 'مشاهد',
    'streamStarted': 'بدأ البث منذ 20 دقيقة',
    'login': 'تسجيل الدخول',
    'search': 'بحث...',
    'secureChat': 'تواصل آمن بلا تطبيقات',
    'joinRoom': 'انضم إلى غرفة الدردشة QR',
    'shareCode': 'شارك الكود للدخول إلى الغرفة مباشرة فورًا',
    'groups': 'المجموعات',
    'createQR': 'إنشاء رمز QR',
    'shareQR': 'شارك رمز QR هذا مع الآخرين للتواصل',
    'download': 'تنزيل',
    'share': 'مشاركة',
    'copy': 'نسخ',
    'linkCopied': 'تم نسخ الرابط!',
    'copyFailed': 'فشل نسخ الرابط',
    'phoneEmail': 'رقم الهاتف / البريد الإلكتروني / اسم المستخدم',
    'loginWithQR': 'تسجيل الدخول برمز QR',
    'continueWithFacebook': 'المتابعة مع فيسبوك',
    'continueWithGoogle': 'المتابعة مع جوجل',
    'continueWithApple': 'المتابعة مع آبل',
    'scanQR': 'مسح رمز QR',
    'pointCamera': 'وجّه كاميرا هاتفك نحو رمز QR للانضمام إلى الدردشة',
    'useMobile': 'استخدم هاتفك لمسح رمز QR',
    'openCamera': 'فتح كاميرا المسح',
    'welcome': 'مرحباً بك في ChatQR',
    'welcomeMessage': 'امسح الرمز أدناه للوصول السريع',
    'searchResults': 'نتائج البحث',
    'noResults': 'لا توجد نتائج',
    'language': 'اللغة',
  },
  en: {
    // English translations
    'live': 'Live Streaming Now',
    'viewers': 'viewers',
    'streamStarted': 'Stream started 20 minutes ago',
    'login': 'Login',
    'search': 'Search...',
    'secureChat': 'Secure Chat Without Apps',
    'joinRoom': 'Join QR Chat Room',
    'shareCode': 'Share the code to enter the room instantly',
    'groups': 'Groups',
    'createQR': 'Create QR Code',
    'shareQR': 'Share this QR code with others to connect',
    'download': 'Download',
    'share': 'Share',
    'copy': 'Copy',
    'linkCopied': 'Link copied to clipboard!',
    'copyFailed': 'Failed to copy link',
    'phoneEmail': 'Phone / Email / Username',
    'loginWithQR': 'Login with QR Code',
    'continueWithFacebook': 'Continue with Facebook',
    'continueWithGoogle': 'Continue with Google',
    'continueWithApple': 'Continue with Apple',
    'scanQR': 'Scan QR Code',
    'pointCamera': 'Point your camera to the QR code to join the chat',
    'useMobile': 'Use your mobile to scan QR code',
    'openCamera': 'Open Scanner Camera',
    'welcome': 'Welcome to ChatQR',
    'welcomeMessage': 'Scan the code below for quick access',
    'searchResults': 'Search Results',
    'noResults': 'No Results Found',
    'language': 'Language',
  },
  fr: {
    // French translations
    'live': 'En Direct Maintenant',
    'viewers': 'spectateurs',
    'streamStarted': 'Le direct a commencé il y a 20 minutes',
    'login': 'Connexion',
    'search': 'Rechercher...',
    'secureChat': 'Chat Sécurisé Sans Applications',
    'joinRoom': 'Rejoindre la Salle de Chat QR',
    'shareCode': 'Partagez le code pour entrer dans la salle instantanément',
    'groups': 'Groupes',
    'createQR': 'Créer un Code QR',
    'shareQR': 'Partagez ce code QR avec d\'autres pour vous connecter',
    'download': 'Télécharger',
    'share': 'Partager',
    'copy': 'Copier',
    'linkCopied': 'Lien copié dans le presse-papiers!',
    'copyFailed': 'Échec de la copie du lien',
    'phoneEmail': 'Téléphone / Email / Nom d\'utilisateur',
    'loginWithQR': 'Connexion avec Code QR',
    'continueWithFacebook': 'Continuer avec Facebook',
    'continueWithGoogle': 'Continuer avec Google',
    'continueWithApple': 'Continuer avec Apple',
    'scanQR': 'Scanner le Code QR',
    'pointCamera': 'Pointez votre caméra vers le code QR pour rejoindre le chat',
    'useMobile': 'Utilisez votre mobile pour scanner le code QR',
    'openCamera': 'Ouvrir la Caméra du Scanner',
    'welcome': 'Bienvenue sur ChatQR',
    'welcomeMessage': 'Scannez le code ci-dessous pour un accès rapide',
    'searchResults': 'Résultats de Recherche',
    'noResults': 'Aucun Résultat Trouvé',
    'language': 'Langue',
  },
  es: {
    // Spanish translations
    'live': 'Transmitiendo Ahora',
    'viewers': 'espectadores',
    'streamStarted': 'La transmisión comenzó hace 20 minutos',
    'login': 'Iniciar Sesión',
    'search': 'Buscar...',
    'secureChat': 'Chat Seguro Sin Aplicaciones',
    'joinRoom': 'Unirse a la Sala de Chat QR',
    'shareCode': 'Comparte el código para entrar a la sala instantáneamente',
    'groups': 'Grupos',
    'createQR': 'Crear Código QR',
    'shareQR': 'Comparte este código QR con otros para conectarte',
    'download': 'Descargar',
    'share': 'Compartir',
    'copy': 'Copiar',
    'linkCopied': '¡Enlace copiado al portapapeles!',
    'copyFailed': 'Error al copiar el enlace',
    'phoneEmail': 'Teléfono / Correo / Nombre de usuario',
    'loginWithQR': 'Iniciar Sesión con Código QR',
    'continueWithFacebook': 'Continuar con Facebook',
    'continueWithGoogle': 'Continuar con Google',
    'continueWithApple': 'Continuar con Apple',
    'scanQR': 'Escanear Código QR',
    'pointCamera': 'Apunta tu cámara al código QR para unirte al chat',
    'useMobile': 'Usa tu móvil para escanear el código QR',
    'openCamera': 'Abrir Cámara de Escáner',
    'welcome': 'Bienvenido a ChatQR',
    'welcomeMessage': 'Escanea el código de abajo para acceso rápido',
    'searchResults': 'Resultados de Búsqueda',
    'noResults': 'No se encontraron resultados',
    'language': 'Idioma',
  },
  tr: {
    // Turkish translations
    'live': 'Şimdi Canlı Yayında',
    'viewers': 'izleyici',
    'streamStarted': 'Yayın 20 dakika önce başladı',
    'login': 'Giriş Yap',
    'search': 'Ara...',
    'secureChat': 'Uygulamasız Güvenli Sohbet',
    'joinRoom': 'QR Sohbet Odasına Katıl',
    'shareCode': 'Odaya anında girmek için kodu paylaş',
    'groups': 'Gruplar',
    'createQR': 'QR Kod Oluştur',
    'shareQR': 'Bağlanmak için bu QR kodu başkalarıyla paylaş',
    'download': 'İndir',
    'share': 'Paylaş',
    'copy': 'Kopyala',
    'linkCopied': 'Bağlantı panoya kopyalandı!',
    'copyFailed': 'Bağlantı kopyalama başarısız',
    'phoneEmail': 'Telefon / E-posta / Kullanıcı adı',
    'loginWithQR': 'QR Kod ile Giriş Yap',
    'continueWithFacebook': 'Facebook ile Devam Et',
    'continueWithGoogle': 'Google ile Devam Et',
    'continueWithApple': 'Apple ile Devam Et',
    'scanQR': 'QR Kodu Tara',
    'pointCamera': 'Sohbete katılmak için kameranı QR koda doğrult',
    'useMobile': 'QR kodu taramak için mobilini kullan',
    'openCamera': 'Tarayıcı Kamerasını Aç',
    'welcome': 'ChatQR\'a Hoş Geldiniz',
    'welcomeMessage': 'Hızlı erişim için aşağıdaki kodu tarayın',
    'searchResults': 'Arama Sonuçları',
    'noResults': 'Sonuç Bulunamadı',
    'language': 'Dil',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Get language preference from localStorage or use Arabic as default
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem('language') as Language) || 'ar'
  );
  
  const [translations, setTranslations] = useState(translationsData[language]);

  // Update translations when language changes
  useEffect(() => {
    setTranslations(translationsData[language]);
    localStorage.setItem('language', language);
    
    // Update document direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Add language class to body
    document.body.className = language === 'ar' ? 'font-tajawal' : 'font-sans';
  }, [language]);

  // Set language function
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
