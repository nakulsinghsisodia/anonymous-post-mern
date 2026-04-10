import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Heart, User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ConfessionCard = ({ confession }) => {
  const { user, token, API_URL } = useContext(AuthContext);
  const [likes, setLikes] = useState(confession.likes);
  const [isLiking, setIsLiking] = useState(false);

  const hasLiked = user && likes.includes(user.id);

  const handleLike = async () => {
    if (!token) return alert('Please login to interact.');
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      const res = await axios.put(`${API_URL}/confessions/${confession._id}/like`);
      setLikes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLiking(false);
    }
  };

  const date = new Date(confession.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
            {confession.isAnonymous ? (
              <Sparkles className="w-5 h-5 text-zinc-400" />
            ) : (
              <User className="w-5 h-5 text-primary" />
            )}
          </div>
          <div>
            <p className="font-semibold text-zinc-200">
              {confession.isAnonymous ? 'Anonymous' : confession.author?.username || 'Unknown'}
            </p>
            <p className="text-xs text-zinc-500">{date}</p>
          </div>
        </div>
        {confession.isAnonymous && (
           <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-zinc-800/50 text-zinc-400 rounded-md border border-zinc-700/50">
             Secret
           </span>
        )}
      </div>

      <p className="text-zinc-300 leading-relaxed text-lg font-light break-words mb-6">
        {confession.content}
      </p>

      <div className="flex items-center space-x-4">
        <button 
          onClick={handleLike}
          className={`flex items-center space-x-1.5 transition-colors group/btn ${hasLiked ? 'text-primary' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <Heart className={`w-5 h-5 ${hasLiked ? 'fill-primary' : 'group-hover/btn:fill-zinc-700'}`} />
          </motion.div>
          <span className="text-sm font-medium">{likes.length}</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ConfessionCard;
