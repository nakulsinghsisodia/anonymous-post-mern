import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Send, Ghost } from 'lucide-react';
import { motion } from 'framer-motion';

const CreateConfessionPage = () => {
  const MAX_CONTENT_LENGTH = 500;
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { token, API_URL } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/auth');
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || content.length > MAX_CONTENT_LENGTH) return;
    
    setIsLoading(true);
    setError('');
    try {
      await axios.post(`${API_URL}/confessions`, { content, isAnonymous });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error posting confession');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Share your thought</h1>
          <p className="text-zinc-400">Speak your mind. We'll listen.</p>
        </div>

        <div className="glass-card p-6 sm:p-8">
          {error && (
            <div className="mb-4 p-3 rounded bg-red-900/30 border border-red-500/50 text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's bothering you?..."
                className="w-full bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-500 rounded-xl px-4 py-4 min-h-[200px] resize-y focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-lg leading-relaxed"
                maxLength={MAX_CONTENT_LENGTH}
                required
              />
              <div className="mt-2 text-right text-xs text-zinc-500">
                {content.length}/{MAX_CONTENT_LENGTH}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${isAnonymous ? 'bg-primary/20 text-primary' : 'bg-zinc-800 text-zinc-400'}`}>
                  <Ghost className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Post Anonymously</p>
                  <p className="text-xs text-zinc-500">Hide your identity from others</p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isAnonymous ? 'bg-primary' : 'bg-zinc-700'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAnonymous ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !content.trim() || content.length > MAX_CONTENT_LENGTH}
                className="flex items-center btn-primary"
              >
                {isLoading ? 'Posting...' : (
                  <>
                    <span>Post</span>
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateConfessionPage;
