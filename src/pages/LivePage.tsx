
import React from 'react';
import { Tv } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LivePage = () => {
  const { translations } = useLanguage();
  
  return (
    <div className="py-8 px-6">
      <div className="flex items-center mb-6">
        <Tv size={20} className="text-neon" />
        <h2 className="text-2xl font-bold mr-2">{translations['live']}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLiveStreams.map((stream, index) => (
          <LiveStreamCard key={index} {...stream} />
        ))}
      </div>
    </div>
  );
};

type LiveStreamCardProps = {
  title: string;
  viewers?: number;
};

const LiveStreamCard = ({ title, viewers = 0 }: LiveStreamCardProps) => {
  const { translations } = useLanguage();
  
  return (
    <div className="bg-chatqr-card rounded-lg overflow-hidden cursor-pointer group">
      <div className="bg-gray-800 h-48 relative">
        <span className="live-badge">LIVE</span>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-xs py-1 px-2 rounded">
          {viewers} {translations['viewers']}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium group-hover:text-neon transition">{title}</h3>
        <p className="text-gray-400 text-sm mt-1">{translations['streamStarted']}</p>
      </div>
    </div>
  );
};

// Mock data
const mockLiveStreams = [
  { title: "بث مباشر مجاني تجريبي", viewers: 124 },
  { title: "بث مباشر مناقشة مفتوحة", viewers: 56 },
  { title: "بث مباشر مجاني تجريبي", viewers: 83 },
  { title: "محادثة جماعية للمبرمجين", viewers: 203 },
  { title: "نقاش تقني حول البرمجة", viewers: 147 },
  { title: "بث مباشر لمشاركة الأفكار", viewers: 92 }
];

export default LivePage;
