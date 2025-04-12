
import React from 'react';
import { Home, Tv, QrCode, MessageSquare, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-[75px] bg-chatqr-darker flex flex-col items-center pt-5 fixed right-0">
      <div className="mb-10">
        <Link to="/">
          <div className="w-10 h-10 bg-neon rounded-md flex items-center justify-center">
            <QrCode size={24} className="text-black" />
          </div>
        </Link>
      </div>
      
      <div className="flex flex-col items-center gap-8">
        <NavItem icon={<Home size={24} />} label="الرئيسية" to="/" active />
        <NavItem icon={<Tv size={24} />} label="مباشر" to="/live" />
        <NavItem icon={<QrCode size={24} />} label="مسح QR" to="/scan" />
        <NavItem icon={<MessageSquare size={24} />} label="دردشة" to="/chat" />
      </div>
      
      <div className="mt-auto mb-8">
        <NavItem icon={<Users size={24} />} label="مجموعات" to="/groups" />
      </div>
    </div>
  );
};

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
};

const NavItem = ({ icon, label, to, active }: NavItemProps) => {
  return (
    <Link to={to} className="relative group">
      <div className={`w-10 h-10 ${active ? 'text-neon' : 'text-gray-500'} flex items-center justify-center group-hover:text-neon transition-all duration-200`}>
        {icon}
      </div>
      <span className="text-xs text-center block mt-1 text-gray-400 group-hover:text-neon">{label}</span>
      {active && <div className="absolute right-[-15px] top-[10px] h-4 w-1 bg-neon rounded-l-md"></div>}
    </Link>
  );
};

export default Sidebar;
