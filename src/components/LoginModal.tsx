
import React, { useState } from 'react';
import { QrCode, X } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { useLanguage } from '../contexts/LanguageContext';
import { QRCodeSVG } from 'qrcode.react';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { translations } = useLanguage();
  const [showQRLogin, setShowQRLogin] = useState(false);
  
  if (!isOpen) return null;

  const toggleLoginMethod = () => {
    setShowQRLogin(!showQRLogin);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-chatqr-card rounded-lg w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center">
          {showQRLogin ? translations['loginWithQR'] : translations['login']}
        </h2>
        
        {!showQRLogin ? (
          <>
            <div className="mb-6">
              <input
                type="text"
                placeholder={translations['phoneEmail']}
                className="w-full bg-transparent text-white border border-gray-700 focus:border-neon rounded-lg px-4 py-3 text-sm focus:outline-none"
              />
            </div>
            
            <button 
              onClick={toggleLoginMethod}
              className="w-full bg-gray-800 text-white rounded-lg py-3 flex items-center justify-center mb-4 hover:bg-gray-700 transition"
            >
              <QrCode size={20} className="ml-2" />
              <span>{translations['loginWithQR']}</span>
            </button>
            
            <button className="w-full bg-[#1877F2] text-white rounded-lg py-3 mb-4 hover:bg-[#166FE5] transition">
              {translations['continueWithFacebook']}
            </button>
            
            <button className="w-full bg-gray-800 text-white rounded-lg py-3 mb-4 hover:bg-gray-700 transition">
              {translations['continueWithGoogle']}
            </button>
            
            <button className="w-full bg-gray-800 text-white rounded-lg py-3 hover:bg-gray-700 transition">
              {translations['continueWithApple']}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg mb-6">
              <QRCodeSVG value="https://chatqr.example/login/123456" size={200} />
            </div>
            <p className="text-center text-gray-400 text-sm mb-6">
              {translations['pointCamera']}
            </p>
            <button 
              onClick={toggleLoginMethod}
              className="w-full bg-gray-800 text-white rounded-lg py-3 hover:bg-gray-700 transition"
            >
              {translations['login']}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
