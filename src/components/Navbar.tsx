
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { translations } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Simple mock search results - in a real app, you would search from a database/API
      const mockResults = [
        { id: 1, name: 'Chat Group 1' },
        { id: 2, name: 'Programming Discussion' },
        { id: 3, name: 'Design Team' }
      ].filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(mockResults);
      setShowSearch(true);
    }
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="h-16 bg-chatqr-darker flex items-center justify-between px-6 mr-[75px] border-b border-gray-800">
      <div className="flex items-center">
        {/* Logo moved to the left */}
        <Link to="/" className="text-neon flex items-center gap-2 font-bold text-xl">
          ChatQR
        </Link>
      </div>
      
      <div className="relative flex-1 max-w-md mx-4">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={translations['search']}
              className="bg-gray-800 text-white text-sm rounded-lg pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-neon"
            />
            <button type="submit" className="absolute left-3 top-2.5">
              <Search className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </form>
        
        {/* Search Results Dropdown */}
        {showSearch && (
          <div className="absolute top-full mt-2 w-full bg-chatqr-card rounded-lg shadow-lg z-50">
            <div className="flex justify-between items-center p-3 border-b border-gray-800">
              <h3 className="font-medium">{translations['searchResults']}</h3>
              <button onClick={closeSearch} className="text-gray-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map(result => (
                  <div key={result.id} className="p-3 hover:bg-gray-800 cursor-pointer">
                    {result.name}
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-400">{translations['noResults']}</div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        {/* Login button moved to the right */}
        <button
          onClick={() => setLoginModalOpen(true)}
          className="flex items-center gap-2 bg-transparent text-white border border-gray-700 hover:border-neon px-4 py-1.5 rounded-lg transition"
        >
          <span>{translations['login']}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
        </button>
      </div>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </div>
  );
};

export default Navbar;
