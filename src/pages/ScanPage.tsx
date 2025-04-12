
import React, { useState, useRef } from 'react';
import { QrCode, Camera, Copy, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { QRCodeSVG } from 'qrcode.react';
import { useIsMobile } from '../hooks/use-mobile';
import { useToast } from '../hooks/use-toast';

const ScanPage = () => {
  const { translations, language } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const qrValue = "https://chatqr.example/join/123456";
  
  const handleOpenCamera = () => {
    setIsScanning(true);
    // في التطبيق الحقيقي، هنا ستقوم بتنشيط كاميرا الجهاز
    // هذه مجرد محاكاة للوظيفة
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: translations['scanSuccessful'] || 'QR Code scanned successfully!',
        description: translations['joining'] || 'Joining the chat room...',
        duration: 3000
      });
    }, 3000);
  };

  const handleCopyQrLink = () => {
    navigator.clipboard.writeText(qrValue)
      .then(() => {
        toast({
          title: translations['linkCopied'] || 'Link copied to clipboard!',
          duration: 2000
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: translations['copyFailed'] || 'Failed to copy link',
          duration: 2000
        });
      });
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById('sample-qr-code') as HTMLCanvasElement;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'chatqr-code.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className={`h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3">{translations['scanQR']}</h1>
        <p className="text-gray-400 text-lg">{translations['pointCamera']}</p>
      </div>
      
      {isScanning ? (
        <div className="border-2 border-neon animate-pulse border-dashed rounded-xl p-8 md:p-12 mb-8 flex flex-col items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon opacity-20"></div>
          <Camera size={isMobile ? 60 : 80} className="text-neon mb-4" />
          <p className="text-gray-400 text-lg">{translations['scanning'] || 'Scanning...'}</p>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 md:p-12 mb-8 flex flex-col items-center">
          <QrCode size={isMobile ? 60 : 80} className="text-gray-400 mb-4" />
          <p className="text-gray-400 text-lg">{translations['useMobile']}</p>
        </div>
      )}
      
      <button 
        onClick={handleOpenCamera}
        className="bg-neon text-black font-medium rounded-lg px-6 py-3 hover:bg-opacity-80 transition"
      >
        {translations['openCamera']}
      </button>
      
      {/* Sample QR code for testing */}
      <div className="mt-12 md:mt-16 text-center">
        <h3 className="text-xl font-semibold mb-3">{translations['shareQR']}</h3>
        <div className="bg-white inline-block p-4 rounded-lg mx-auto cursor-pointer mb-4" onClick={handleCopyQrLink}>
          <QRCodeSVG 
            id="sample-qr-code" 
            value={qrValue} 
            size={isMobile ? 120 : 150}
            includeMargin={true}
          />
        </div>
        <div className="flex justify-center gap-3">
          <button 
            onClick={handleCopyQrLink} 
            className="flex items-center gap-1 bg-gray-800 text-white rounded-lg px-3 py-1.5 hover:bg-gray-700"
          >
            <Copy size={16} />
            <span>{translations['copy'] || 'Copy'}</span>
          </button>
          <button 
            onClick={handleDownloadQR} 
            className="flex items-center gap-1 bg-gray-800 text-white rounded-lg px-3 py-1.5 hover:bg-gray-700"
          >
            <Download size={16} />
            <span>{translations['download'] || 'Download'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
