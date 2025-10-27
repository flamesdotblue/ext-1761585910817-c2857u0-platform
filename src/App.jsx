import { useState } from 'react';
import { Crown, LogIn, UserPlus } from 'lucide-react';
import Hero from './components/Hero';
import IncomeTracker from './components/IncomeTracker';
import PremiumFeatures from './components/PremiumFeatures';
import AuthSection from './components/AuthSection';

export default function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup' | 'recover'

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" aria-label="Main navigation">
          <a href="#top" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 rounded">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500" aria-hidden="true" />
            <span className="font-semibold tracking-tight">FlowFin</span>
          </a>
          <ul className="hidden md:flex items-center gap-6 text-sm">
            <li><a href="#tracker" className="hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 rounded px-1 py-1">Tracker</a></li>
            <li><a href="#premium" className="hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 rounded px-1 py-1">Premium</a></li>
            <li><a href="#auth" className="hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 rounded px-1 py-1">Account</a></li>
          </ul>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setShowAuth(true); setAuthMode('signin'); }}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
              aria-label="Sign in"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Sign in
            </button>
            <a
              href="#premium"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-sky-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:from-emerald-500 hover:to-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
              aria-label="Go to premium"
            >
              <Crown className="h-4 w-4" aria-hidden="true" />
              Go Premium
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        <Hero onGetStarted={() => { setShowAuth(true); setAuthMode('signup'); }} />
        <section id="tracker" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <IncomeTracker />
        </section>
        <section id="premium" className="bg-white border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <PremiumFeatures onUpgrade={() => { setShowAuth(true); setAuthMode('signup'); }} />
          </div>
        </section>
        <section id="auth" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <AuthSection defaultMode={authMode} visible={showAuth} onClose={() => setShowAuth(false)} onSwitchMode={(m) => setAuthMode(m)} />
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500" aria-hidden="true" />
              <span className="font-semibold">FlowFin</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">Track income effortlessly. Clear insights, modern design, and premium analytics when you need them.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Product</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li><a href="#tracker" className="hover:text-slate-900">Income tracker</a></li>
              <li><a href="#premium" className="hover:text-slate-900">Premium features</a></li>
              <li><a href="#auth" className="hover:text-slate-900">Sign in</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li><span>Privacy</span></li>
              <li><span>Terms</span></li>
              <li><span>Security</span></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500 pb-8">© {new Date().getFullYear()} FlowFin. All rights reserved.</div>
      </footer>
    </div>
  );
}
