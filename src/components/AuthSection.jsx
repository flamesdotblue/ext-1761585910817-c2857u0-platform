import { useEffect, useId, useState } from 'react';
import { Lock, Unlock, UserPlus, LogIn } from 'lucide-react';

export default function AuthSection({ defaultMode = 'signin', visible = true, onClose, onSwitchMode }) {
  const [mode, setMode] = useState(defaultMode);
  useEffect(() => setMode(defaultMode), [defaultMode]);

  if (!visible) return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Account</h2>
      <p className="mt-2 text-slate-700 text-sm">Sign up or sign in with your email. Password recovery supported.</p>
      <div className="mt-4 flex gap-3">
        <button onClick={() => onSwitchMode?.('signup')} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500">
          <UserPlus className="h-4 w-4" aria-hidden="true" /> Sign up
        </button>
        <button onClick={() => onSwitchMode?.('signin')} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50">
          <LogIn className="h-4 w-4" aria-hidden="true" /> Sign in
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{mode === 'signin' ? 'Welcome back' : mode === 'signup' ? 'Create your account' : 'Recover password'}</h2>
          <p className="mt-1 text-sm text-slate-600">Secure email-based authentication with password recovery.</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500" aria-label="Close">
            Close
          </button>
        )}
      </div>

      {mode === 'signin' && <SignInForm onSwitchMode={setMode} />}
      {mode === 'signup' && <SignUpForm onSwitchMode={setMode} />}
      {mode === 'recover' && <RecoverForm onSwitchMode={setMode} />}

      <div className="mt-6 rounded-lg bg-gradient-to-r from-emerald-50 to-sky-50 border border-slate-200 p-4">
        <div className="flex items-center gap-3 text-sm text-slate-700">
          <Unlock className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          <p>Sign in unlocks core income tracking for free. Upgrade to premium anytime for advanced features.</p>
        </div>
      </div>
    </div>
  );
}

function SignInForm({ onSwitchMode }) {
  const emailId = useId();
  const passwordId = useId();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) return setError('Enter your email and password.');
    // Simulated sign-in
    alert(`Signed in as ${email}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4" aria-labelledby="signin-title">
      <div>
        <label htmlFor={emailId} className="block text-sm font-medium text-slate-700">Email</label>
        <input id={emailId} type="email" autoComplete="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
      </div>
      <div>
        <label htmlFor={passwordId} className="block text-sm font-medium text-slate-700">Password</label>
        <div className="mt-1 flex rounded-lg border border-slate-300 focus-within:ring-2 focus-within:ring-emerald-500">
          <input id={passwordId} type={showPw ? 'text':'password'} autoComplete="current-password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full rounded-l-lg border-0 focus:outline-none focus:ring-0 px-3 py-2" />
          <button type="button" onClick={()=>setShowPw(s=>!s)} className="px-3 text-sm text-slate-600 hover:text-slate-900" aria-pressed={showPw} aria-label={showPw ? 'Hide password' : 'Show password'}>
            <Lock className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500">
          <LogIn className="h-4 w-4" aria-hidden="true" /> Sign in
        </button>
        <div className="flex items-center gap-3 text-sm">
          <button type="button" onClick={()=>onSwitchMode('recover')} className="text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900">Forgot password?</button>
          <span className="text-slate-400" aria-hidden="true">·</span>
          <button type="button" onClick={()=>onSwitchMode('signup')} className="text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900">Create account</button>
        </div>
      </div>
    </form>
  );
}

function SignUpForm({ onSwitchMode }) {
  const emailId = useId();
  const passwordId = useId();
  const confirmId = useId();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) return setError('Enter your email and password.');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (password !== confirm) return setError('Passwords do not match.');
    alert(`Account created for ${email}`);
    onSwitchMode('signin');
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4" aria-labelledby="signup-title">
      <div>
        <label htmlFor={emailId} className="block text-sm font-medium text-slate-700">Email</label>
        <input id={emailId} type="email" autoComplete="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={passwordId} className="block text-sm font-medium text-slate-700">Password</label>
          <input id={passwordId} type="password" autoComplete="new-password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
        </div>
        <div>
          <label htmlFor={confirmId} className="block text-sm font-medium text-slate-700">Confirm password</label>
          <input id={confirmId} type="password" autoComplete="new-password" required value={confirm} onChange={(e)=>setConfirm(e.target.value)} className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
        </div>
      </div>
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      <div className="flex items-center justify-between">
        <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500">
          <UserPlus className="h-4 w-4" aria-hidden="true" /> Create account
        </button>
        <button type="button" onClick={()=>onSwitchMode('signin')} className="text-sm text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900">Have an account? Sign in</button>
      </div>
    </form>
  );
}

function RecoverForm({ onSwitchMode }) {
  const emailId = useId();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4" aria-labelledby="recover-title">
      <div>
        <label htmlFor={emailId} className="block text-sm font-medium text-slate-700">Email</label>
        <input id={emailId} type="email" autoComplete="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
      </div>
      {sent && <p className="text-sm text-emerald-700">If an account exists for {email}, you'll receive a recovery link shortly.</p>}
      <div className="flex items-center justify-between">
        <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500">
          <Lock className="h-4 w-4" aria-hidden="true" /> Send recovery link
        </button>
        <button type="button" onClick={()=>onSwitchMode('signin')} className="text-sm text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900">Back to sign in</button>
      </div>
    </form>
  );
}
