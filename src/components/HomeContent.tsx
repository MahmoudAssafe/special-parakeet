
import React, { useState } from 'react';
import { Users, Download, Share2, Tv } from 'lucide-react';
import QRModal from './QRModal';
import { useLanguage } from '../contexts/LanguageContext';

const HomeContent = () => {
  const [isQRModalOpen, setQRModalOpen] = useState(false);
  const { translations } = useLanguage();
  
  return (
    <div className="py-8 px-6">
      <div className="flex flex-col items-center justify-center mb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">{translations['secureChat']}</h1>
          <p className="text-gray-400 text-lg max-w-md">{translations['joinRoom']}</p>
        </div>
        
        <div className="qr-glow bg-white p-6 rounded-xl max-w-xs mx-auto cursor-pointer" onClick={() => setQRModalOpen(true)}>
          <img src="/lovable-uploads/ca5d202e-a42e-43ab-9bf7-ec355764b4fa.png" alt="QR Code" className="w-full h-auto" />
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-neon">ChatQR</p>
          <p className="text-sm text-gray-400 mt-2">{translations['shareCode']}</p>
        </div>
      </div>
      
      {/* Groups Section */}
      <div>
        <div className="flex items-center mb-6">
          <Users size={20} className="text-neon" />
          <h2 className="text-xl font-bold mr-2">{translations['groups']}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockGroups.map((group, index) => (
            <GroupCard key={index} {...group} />
          ))}
        </div>
        
        <div className="mt-12">
          <div className="flex items-center mb-6">
            <Tv size={20} className="text-neon" />
            <h2 className="text-xl font-bold mr-2">{translations['live']}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockLiveStreams.map((stream, index) => (
              <LiveStreamCard key={index} {...stream} />
            ))}
          </div>
        </div>
      </div>
      
      <QRModal isOpen={isQRModalOpen} onClose={() => setQRModalOpen(false)} />
    </div>
  );
};

type GroupCardProps = {
  title: string;
  isLive?: boolean;
};

const GroupCard = ({ title, isLive }: GroupCardProps) => {
  return (
    <div className="bg-chatqr-card rounded-lg p-4 h-40 flex items-end relative cursor-pointer hover:bg-gray-800 transition">
      {isLive && <span className="live-badge">LIVE</span>}
      <h3 className="text-sm font-medium">{title}</h3>
    </div>
  );
};

type LiveStreamCardProps = {
  title: string;
};

const LiveStreamCard = ({ title }: LiveStreamCardProps) => {
  return (
    <div className="bg-chatqr-card rounded-lg p-4 h-40 flex items-end relative cursor-pointer hover:bg-gray-800 transition">
      <span className="live-badge">LIVE</span>
      <h3 className="text-sm font-medium">{title}</h3>
    </div>
  );
};

// Mock data
const mockGroups = [
  { title: "غرفة للنقاشات اليومية ومشاركة الأفكار", isLive: true },
  { title: "اجتماع المجموعة الأسبوعي للمناقشة" },
  { title: "محادثة مفتوحة لجميع المهتمين بالموضوع" },
  { title: "غرفة للنقاشات اليومية ومشاركة الأفكار", isLive: true },
  { title: "اجتماع المجموعة الأسبوعي للمناقشة" },
  { title: "محادثة مفتوحة لجميع المهتمين بالموضوع" }
];

const mockLiveStreams = [
  { title: "بث مباشر مجاني تجريبي" },
  { title: "بث مباشر مناقشة مفتوحة" },
  { title: "بث مباشر مجاني تجريبي" }
];

export default HomeContent;
