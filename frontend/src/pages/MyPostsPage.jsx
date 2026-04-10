import React, { useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, MessageSquareText, Trash2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import ConfessionCard from '../components/ConfessionCard';
import { useNavigate } from 'react-router-dom';

const MyPostsPage = () => {
  const { token, API_URL, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingPostId, setDeletingPostId] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/auth');
      return;
    }

    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/confessions/mine`);
        setPosts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load your posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [token, navigate, API_URL]);

  const totalLikes = useMemo(
    () => posts.reduce((acc, post) => acc + post.likes.length, 0),
    [posts]
  );

  const handleDeletePost = async (postId) => {
    const confirmed = window.confirm('Delete this post permanently?');
    if (!confirmed) return;

    setDeletingPostId(postId);
    setError('');
    try {
      await axios.delete(`${API_URL}/confessions/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete post.');
    } finally {
      setDeletingPostId(null);
    }
  };

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
        className="mb-8"
      >
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          My Posts
        </h1>
        <p className="text-zinc-400">
          {user ? `${user.username}, here are all your confessions.` : 'Your personal confession timeline.'}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass-card p-4">
          <p className="text-zinc-400 text-sm">Total Posts</p>
          <p className="text-2xl font-bold text-white mt-1">{posts.length}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-zinc-400 text-sm">Total Likes</p>
          <p className="text-2xl font-bold text-white mt-1">{totalLikes}</p>
        </div>
      </div>

      {error ? (
        <div className="glass-card p-5 border border-red-500/40 text-red-200">{error}</div>
      ) : posts.length === 0 ? (
        <div className="glass-card text-center py-12 px-6">
          <MessageSquareText className="w-10 h-10 mx-auto text-zinc-500 mb-3" />
          <p className="text-zinc-300 font-medium">No posts yet</p>
          <p className="text-zinc-500 text-sm mt-2">
            Create your first confession to see it here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id}>
              <ConfessionCard confession={post} />
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleDeletePost(post._id)}
                  disabled={deletingPostId === post._id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-red-500/40 text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {deletingPostId === post._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostsPage;
