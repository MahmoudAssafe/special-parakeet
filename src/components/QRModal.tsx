
import React from 'react';
import { Download, Share2, Copy, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { QRCodeSVG } from 'qrcode.react';
import { useIsMobile } from '../hooks/use-mobile';
import { useToast } from '../hooks/use-toast';

type QRModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const QRModal = ({ isOpen, onClose }: QRModalProps) => {
  const { translations, language } = useLanguage();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const qrValue = "https://chatqr.example/join/123456";
  
  if (!isOpen) return null;
  
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
    const canvas = document.getElementById('modal-qr-code') as HTMLCanvasElement;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'chatqr-code.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ChatQR',
          text: translations['shareQR'],
          url: qrValue,
        });
        toast({
          title: translations['sharedSuccessfully'] || 'Shared successfully!',
          duration: 2000
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopyQrLink();
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="bg-chatqr-card rounded-lg w-full max-w-md p-4 md:p-6 relative">
        <button 
          onClick={onClose}
          className={`absolute ${language === 'ar' ? 'left-4' : 'right-4'} top-4 text-gray-400 hover:text-white`}
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center">{translations['createQR']}</h2>
        
        <div className="bg-white p-4 md:p-6 rounded-lg max-w-xs mx-auto cursor-pointer" onClick={handleCopyQrLink}>
          <QRCodeSVG 
            id="modal-qr-code"
            value={qrValue} 
            size={isMobile ? 200 : 240} 
            includeMargin={true}
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <button 
            onClick={handleDownloadQR}
            className="flex items-center gap-2 bg-gray-800 text-white rounded-lg px-4 py-2 hover:bg-gray-700 transition"
          >
            <Download size={18} />
            <span>{translations['download']}</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 bg-gray-800 text-white rounded-lg px-4 py-2 hover:bg-gray-700 transition"
          >
            <Share2 size={18} />
            <span>{translations['share']}</span>
          </button>
          <button 
            onClick={handleCopyQrLink}
            className="flex items-center gap-2 bg-gray-800 text-white rounded-lg px-4 py-2 hover:bg-gray-700 transition"
          >
            <Copy size={18} />
            <span>{translations['copy'] || 'Copy'}</span>
          </button>
        </div>
        
        <p className="text-center text-gray-400 text-sm mt-6">
          {translations['shareQR']}
        </p>
      </div>
    </div>
  );
};

export default QRModal;
