import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MessageSquarePlus, Shield, LogOut, LogIn, UserRoundPen } from 'lucide-react';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'text-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'text-zinc-400 hover:text-white transition-colors';

  return (
    <nav className="fixed top-0 w-full z-50 glass-card rounded-none border-t-0 border-x-0 border-b border-card-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl tracking-tight text-white">Anonymous Chat</span>
          </Link>
          
          <div className="flex items-center space-x-6 sm:space-x-8">
            <Link to="/" className={`flex items-center space-x-1.5 text-sm font-medium ${isActive('/')}`}>
              <span>Feed</span>
            </Link>
            
            {user ? (
              <>
                <Link to="/create" className={`flex items-center space-x-1.5 text-sm font-medium ${isActive('/create')}`}>
                  <MessageSquarePlus className="w-4 h-4" />
                  <span className="hidden sm:inline">New Confession</span>
                </Link>
                <Link to="/my-posts" className={`flex items-center space-x-1.5 text-sm font-medium ${isActive('/my-posts')}`}>
                  <UserRoundPen className="w-4 h-4" />
                  <span className="hidden sm:inline">My Posts</span>
                </Link>
                <button 
                  onClick={logout}
                  className="flex items-center space-x-1.5 text-sm font-medium text-zinc-400 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link to="/auth" className={`flex items-center space-x-1.5 text-sm font-medium btn-primary px-3 py-1.5`}>
                <LogIn className="w-4 h-4" />
                <span>Join</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
