import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import FeedPage from './pages/FeedPage';
import AuthPage from './pages/AuthPage';
import CreateConfessionPage from './pages/CreateConfessionPage';
import MyPostsPage from './pages/MyPostsPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/create" element={<CreateConfessionPage />} />
            <Route path="/my-posts" element={<MyPostsPage />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
