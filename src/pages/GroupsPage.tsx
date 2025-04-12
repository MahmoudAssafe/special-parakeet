
import React from 'react';
import { Users } from 'lucide-react';

const GroupsPage = () => {
  return (
    <div className="py-8 px-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users size={20} className="text-neon" />
          <h2 className="text-2xl font-bold mr-2">المجموعات</h2>
        </div>
        <button className="bg-neon text-black rounded-lg px-4 py-2 text-sm font-medium hover:bg-neon-hover transition">
          إنشاء مجموعة جديدة
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGroups.map((group, index) => (
          <GroupCard key={index} {...group} />
        ))}
      </div>
    </div>
  );
};

type GroupCardProps = {
  title: string;
  members: number;
  isLive?: boolean;
};

const GroupCard = ({ title, members, isLive }: GroupCardProps) => {
  return (
    <div className="bg-chatqr-card rounded-lg overflow-hidden cursor-pointer group">
      <div className="bg-gray-800 h-48 relative">
        {isLive && <span className="live-badge">LIVE</span>}
      </div>
      <div className="p-4">
        <h3 className="font-medium group-hover:text-neon transition">{title}</h3>
        <div className="flex items-center mt-2">
          <Users size={16} className="text-gray-400" />
          <span className="text-gray-400 text-sm mr-1">{members} عضو</span>
        </div>
      </div>
    </div>
  );
};

// Mock data
const mockGroups = [
  { title: "غرفة للنقاشات اليومية ومشاركة الأفكار", members: 356, isLive: true },
  { title: "اجتماع المجموعة الأسبوعي للمناقشة", members: 128 },
  { title: "محادثة مفتوحة لجميع المهتمين بالموضوع", members: 219 },
  { title: "مشاركة مجموعة التدوينات المفتوحة", members: 183 },
  { title: "اجتماع المجموعة الأسبوعي للمناقشة", members: 97 },
  { title: "غرفة المحادثات الجماعية للمبرمجين ومشاركة الأفكار", members: 412, isLive: true }
];

export default GroupsPage;
