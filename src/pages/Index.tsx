
import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import HomeContent from '../components/HomeContent';
import WelcomeQRBanner from '../components/WelcomeQRBanner';

const Index = () => {
  return (
    <div className="min-h-screen bg-chatqr-dark text-white">
      <Navbar />
      <Sidebar />
      <div className="mr-[75px]">
        <HomeContent />
      </div>
      <WelcomeQRBanner />
    </div>
  );
};

export default Index;
