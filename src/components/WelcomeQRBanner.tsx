
import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Download, Copy } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { useToast } from '../hooks/use-toast';

const WelcomeQRBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { translations, language } = useLanguage();
  const [currentUrl, setCurrentUrl] = useState('');
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    // Get the current URL for the QR code
    setCurrentUrl(window.location.href);
    
    // Check if user has dismissed the banner before
    const isDismissed = localStorage.getItem('welcomeQrDismissed');
    if (isDismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Remember that user dismissed the banner
    localStorage.setItem('welcomeQrDismissed', 'true');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        toast({
          title: translations['linkCopied'] || 'Link copied to clipboard!',
          duration: 2000
        });
      })
      .catch(() => {
        toast({
          title: translations['copyFailed'] || 'Failed to copy link',
          variant: 'destructive',
          duration: 2000
        });
      });
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById('welcome-qr-code') as HTMLCanvasElement;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'chatqr-invitation.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed ${isMobile ? 'bottom-2 right-2 left-2 max-w-full' : 'bottom-5 right-5 max-w-xs'} z-40 bg-chatqr-card rounded-lg shadow-lg p-4 md:p-5`}>
      <button 
        onClick={handleDismiss} 
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
      >
        <X size={18} />
      </button>
      <h3 className="text-lg font-bold mb-2 text-center">{translations['welcome']}</h3>
      <p className="text-gray-400 text-sm mb-4 text-center">{translations['welcomeMessage']}</p>
      <div className="bg-white p-3 rounded-lg mb-2 mx-auto cursor-pointer" onClick={handleCopyLink}>
        <QRCodeSVG 
          id="welcome-qr-code"
          value={currentUrl} 
          size={isMobile ? 120 : 150} 
          includeMargin={true}
          imageSettings={{
            src: "/placeholder.svg",
            height: 24,
            width: 24,
            excavate: true,
          }}
        />
      </div>
      <div className="flex justify-center gap-2 mt-3">
        <button 
          onClick={handleCopyLink} 
          className="flex items-center gap-1 text-xs bg-gray-800 text-white rounded px-2 py-1 hover:bg-gray-700"
        >
          <Copy size={14} />
          <span>{translations['copy'] || 'Copy'}</span>
        </button>
        <button 
          onClick={handleDownloadQR} 
          className="flex items-center gap-1 text-xs bg-gray-800 text-white rounded px-2 py-1 hover:bg-gray-700"
        >
          <Download size={14} />
          <span>{translations['download'] || 'Download'}</span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeQRBanner;
