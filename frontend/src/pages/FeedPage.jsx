import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ConfessionCard from '../components/ConfessionCard';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const FeedPage = () => {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { API_URL, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchConfessions = async () => {
      try {
        const res = await axios.get(`${API_URL}/confessions`);
        setConfessions(res.data);
      } catch (err) {
        console.error('Error fetching confessions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfessions();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">
          Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-300">Whispers</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          {user ? `Welcome back, ${user.username}. ` : ''}Unfiltered thoughts from around the world.
        </p>
      </motion.div>

      {confessions.length === 0 ? (
        <div className="text-center py-12 glass-card">
          <p className="text-zinc-500">No confessions yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {confessions.map((confession) => (
            <ConfessionCard key={confession._id} confession={confession} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedPage;
