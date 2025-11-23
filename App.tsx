import React, { useState } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Newspaper, Activity, Menu, X, Shield } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Markets from './pages/Markets';
import News from './pages/News';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

// Navigation Component
const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { path: '/', label: 'Overview', icon: LayoutDashboard },
    { path: '/markets', label: 'Markets & Crypto', icon: TrendingUp },
    { path: '/news', label: 'News & Updates', icon: Newspaper },
  ];

  const isActive = (path: string) => {
    return location.pathname === path 
      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
      : 'text-slate-400 hover:text-white hover:bg-slate-800';
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              MarketPulse AI
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive(item.path)}`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </NavLink>
              ))}
              {/* Admin Link */}
              <NavLink
                to={isAuthenticated ? "/admin" : "/login"}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive('/admin') || isActive('/login')}`}
              >
                <Shield className="w-4 h-4 mr-2" />
                {isAuthenticated ? 'Admin' : 'Login'}
              </NavLink>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center block px-3 py-2 rounded-md text-base font-medium ${isActive(item.path)}`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            ))}
             <NavLink
                to={isAuthenticated ? "/admin" : "/login"}
                onClick={() => setIsOpen(false)}
                className={`flex items-center block px-3 py-2 rounded-md text-base font-medium ${isActive('/admin') || isActive('/login')}`}
              >
                <Shield className="w-5 h-5 mr-3" />
                {isAuthenticated ? 'Admin' : 'Login'}
              </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/news" element={<News />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <footer className="border-t border-slate-800 mt-12 py-8 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
              <p>© 2024 MarketPulse AI. Data provided for demonstration purposes.</p>
              <p className="mt-2">Powered by Google Gemini 2.5 Flash</p>
            </div>
          </footer>
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
