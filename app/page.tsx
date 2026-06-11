'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Shield, ArrowRight, Activity, Hash, Calendar, ChevronDown, PlayCircle, Smartphone, KeyRound, QrCode, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/lib/auth';

export default function LandingPageWrap() {
  return (
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
  );
}

function LandingPage() {
  const router = useRouter();
  const { login } = useAuth();

  // UI states
  const [showAuth, setShowAuth] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [regStep, setRegStep] = useState<'form' | 'qr'>('form'); // 'form' or 'qr'
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState<'email' | 'totp' | 'reset'>('email');

  // Registration form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [customId, setCustomId] = useState('');
  const [role, setRole] = useState<'COACH' | 'CLIENT'>('CLIENT');
  // TOTP for registration
  const [totpCode, setTotpCode] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [totpSecret, setTotpSecret] = useState('');

  // Forgot password fields
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotTotpCode, setForgotTotpCode] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [updateToken, setUpdateToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Common states
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Helper: route user after login
  const routeUser = (userData: any) => {
    const userRole = userData?.role?.toUpperCase();
    if (userRole === 'COACH') router.push('/coach/dashboard');
    else router.push('/client');
  };

  // LOGIN (unchanged)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setStatus('Authenticating...');
    const userData = await login(email, password);
    if (userData) {
      setStatus('Access Granted. Routing...');
      setTimeout(() => routeUser(userData), 500);
    } else {
      setStatus('Invalid credentials. Access Denied.');
      setIsLoading(false);
    }
  };

  // REGISTRATION STEP 1: send all details, get QR code
  const handleRegisterInit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name || !role) {
      setStatus('Please fill all required fields.');
      return;
    }
    setIsLoading(true);
    setStatus('Generating QR code...');
    try {
      const res = await fetch('/api/register/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          name,
          role,
          customId,
          birthDate,
          gender,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setQrCodeUrl(data.qrCodeUrl);
        setTotpSecret(data.secret);
        setRegStep('qr');
        setStatus('Scan QR code with your authenticator app');
      } else {
        setStatus(data.error || 'Failed to initiate registration');
        if (res.status === 409) {
          setTimeout(() => {
            setIsRegistering(false);
            setStatus('');
          }, 2500);
        }
      }
    } catch (error) {
      setStatus('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // REGISTRATION STEP 2: verify TOTP code and create user
  const handleVerifyTotp = async () => {
    if (!totpCode) {
      setStatus('Please enter the 6-digit code from your authenticator app');
      return;
    }
    setIsLoading(true);
    setStatus('Verifying code...');
    try {
      const res = await fetch('/api/register/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token: totpCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('Account created! Logging in...');
        const userData = await login(email, password);
        if (userData) routeUser(userData);
      } else {
        setStatus(data.error || 'Invalid code');
      }
    } catch (error) {
      setStatus('Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  // FORGOT PASSWORD: request reset session (step 1 – email)
  const handleForgotRequest = async () => {
    if (!forgotEmail) {
      setStatus('Please enter your email address');
      return;
    }
    setIsLoading(true);
    setStatus('Checking account...');
    try {
      const res = await fetch('/api/auth/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (data.requiresTOTP) {
        setResetToken(data.resetToken);
        setForgotStep('totp');
        setStatus('Enter the 6-digit code from your authenticator app');
      } else {
        // For security, don't reveal if account exists or has TOTP
        setStatus('If an account with TOTP exists, you will be prompted for a code.');
        setTimeout(() => {
          setShowForgot(false);
          setForgotStep('email');
          setForgotEmail('');
          setStatus('');
        }, 2000);
      }
    } catch (error) {
      setStatus('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // FORGOT PASSWORD: verify TOTP and get update token
  const handleVerifyForgotTotp = async () => {
    if (!forgotTotpCode) {
      setStatus('Please enter the 6-digit code');
      return;
    }
    setIsLoading(true);
    setStatus('Verifying code...');
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail,
          token: forgotTotpCode,
          resetToken,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUpdateToken(data.updateToken);
        setForgotStep('reset');
        setStatus('You may now set a new password');
        setForgotTotpCode('');
      } else {
        setStatus(data.error || 'Invalid code');
      }
    } catch (error) {
      setStatus('Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  // FORGOT PASSWORD: reset password
  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      setStatus('Password must be at least 6 characters');
      return;
    }
    setIsLoading(true);
    setStatus('Resetting password...');
    try {
      const res = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updateToken, newPassword }),
      });
      if (res.ok) {
        setStatus('Password reset successfully! You can now log in.');
        setTimeout(() => {
          setShowForgot(false);
          setForgotStep('email');
          setForgotEmail('');
          setNewPassword('');
          setStatus('');
        }, 2000);
      } else {
        const data = await res.json();
        setStatus(data.error || 'Reset failed');
      }
    } catch (error) {
      setStatus('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Combined submit handler for the main form (login or registration step 1)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showForgot) return; // Forgot form is separate
    if (!isRegistering) {
      handleLogin(e);
    } else if (regStep === 'form') {
      handleRegisterInit(e);
    } else if (regStep === 'qr') {
      handleVerifyTotp();
    }
  };

  // Render forgot password modal / inline form
  const renderForgotPassword = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 p-6 rounded-2xl mt-4"
      >
        <h3 className="text-lg font-bold text-center mb-4">Reset Password</h3>
        {forgotStep === 'email' && (
          <>
            <div className="relative mb-4">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="email"
                placeholder="Email Address"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500/50 text-white"
              />
            </div>
            <button
              onClick={handleForgotRequest}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Send Challenge'}
            </button>
          </>
        )}
        {forgotStep === 'totp' && (
          <>
            <div className="relative mb-4">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="6-digit authenticator code"
                value={forgotTotpCode}
                onChange={(e) => setForgotTotpCode(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500/50 text-white text-center tracking-[0.5em] font-bold"
              />
            </div>
            <button
              onClick={handleVerifyForgotTotp}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
          </>
        )}
        {forgotStep === 'reset' && (
          <>
            <div className="relative mb-4">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="password"
                placeholder="New Password (min 6 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500/50 text-white"
              />
            </div>
            <button
              onClick={handleResetPassword}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </>
        )}
        {status && <p className="text-center text-sm mt-3 text-blue-400">{status}</p>}
        <button
          onClick={() => {
            setShowForgot(false);
            setForgotStep('email');
            setForgotEmail('');
            setForgotTotpCode('');
            setNewPassword('');
            setStatus('');
          }}
          className="text-zinc-500 hover:text-white text-xs tracking-widest uppercase font-bold mt-4 w-full text-center"
        >
          Back to Login
        </button>
      </motion.div>
    );
  };

  // Main JSX (unchanged styling, only logic adapted)
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 selection:bg-blue-500/30 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/bgimage.jpg" alt="Background" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4"><Activity className="w-12 h-12 text-blue-500" /></div>
            <h1 className="text-4xl font-black tracking-tighter mb-4 text-white drop-shadow-lg">STRAPS</h1>
            <p className="text-zinc-300 tracking-widest text-sm uppercase drop-shadow-md">Rehab & Training Platform</p>
          </div>

          <AnimatePresence mode="wait">
            {!showAuth ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 p-8 rounded-2xl text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-500 flex items-center justify-center border border-blue-500/30">
                    <PlayCircle className="w-8 h-8" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold tracking-widest uppercase text-white mb-4">Welcome</h2>
                <p className="text-zinc-400 mb-8 leading-relaxed text-sm">
                  Step into the future of AI-powered movement tracking and physical rehabilitation.
                </p>
                <button
                  onClick={() => setShowAuth(true)}
                  className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  Access Platform <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            ) : showForgot ? (
              renderForgotPassword()
            ) : (
              <motion.div
                key="auth"
                layout
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 p-8 rounded-2xl"
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-center mb-6">
                    <div className="text-blue-500 font-black tracking-widest uppercase text-[10px] mb-2 flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                      Ready to train.
                    </div>
                    <h2 className="text-xl font-bold tracking-widest uppercase text-white">
                      {!isRegistering
                        ? 'System Login'
                        : regStep === 'form'
                        ? 'Create Account'
                        : 'Scan QR Code'}
                    </h2>
                  </div>

                  <div className="space-y-5">
                    {/* Only show email and password in login OR registration step 1 */}
                    {(!isRegistering || regStep === 'form') && (
                      <>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                          <input
                            type="email"
                            placeholder="Email Address *"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500/50 text-white"
                            required={!isRegistering || regStep === 'form'}
                            disabled={isRegistering && regStep !== 'form'}
                          />
                        </div>
                        {!isRegistering && (
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                              type="password"
                              placeholder="Password *"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500/50 text-white"
                              required
                            />
                          </div>
                        )}
                      </>
                    )}

                    {/* Registration step 1 full form (includes password, name, role, etc.) */}
                    {isRegistering && regStep === 'form' && (
                      <>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                          <input
                            type="password"
                            placeholder="Password *"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500/50 text-white"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setRole('COACH')}
                            className={`py-3 rounded-xl border font-bold text-sm tracking-widest uppercase transition-all flex flex-col items-center gap-2 ${
                              role === 'COACH'
                                ? 'bg-blue-600/10 text-blue-500 border-blue-500/50'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                            }`}
                          >
                            <Shield className="w-5 h-5" /> Coach
                          </button>
                          <button
                            type="button"
                            onClick={() => setRole('CLIENT')}
                            className={`py-3 rounded-xl border font-bold text-sm tracking-widest uppercase transition-all flex flex-col items-center gap-2 ${
                              role === 'CLIENT'
                                ? 'bg-blue-600/10 text-blue-500 border-blue-500/50'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                            }`}
                          >
                            <User className="w-5 h-5" /> Client
                          </button>
                        </div>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                          <input
                            type="text"
                            placeholder="Full Name *"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500/50 text-white"
                            required
                          />
                        </div>
                        <div className="relative">
                          <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                          <input
                            type="text"
                            placeholder="Unique ID *"
                            value={customId}
                            onChange={(e) => setCustomId(e.target.value.replace(/\s+/g, '').toUpperCase())}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500/50 text-white font-bold tracking-wider"
                            required
                          />
                          <p className="text-[10px] text-zinc-500 mt-1 pl-2">
                            This ID is required to connect Coaches and Clients.
                          </p>
                        </div>
                        {role === 'CLIENT' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                              <input
                                type="date"
                                placeholder="Birth Date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500/50 text-white"
                              />
                              <p className="text-[10px] text-zinc-500 mt-1 pl-2">YYYY-MM-DD (e.g., 1990‑05‑15)</p>
                            </div>
                            <div className="relative">
                              <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full bg-blue-500 border border-transparent rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-blue-400 transition-colors appearance-none text-black font-bold shadow-md cursor-pointer"
                              >
                                <option value="" disabled>Select Gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                                <ChevronDown className="w-4 h-4 text-black" />
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* QR code display and TOTP input (registration step 2) */}
                    {isRegistering && regStep === 'qr' && (
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 bg-white p-2 rounded-xl" />
                        </div>
                        <p className="text-xs text-center text-zinc-400">
                          Scan this QR code with Google Authenticator or any TOTP app.
                        </p>
                        <div className="relative">
                          <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                          <input
                            type="text"
                            placeholder="6-digit code from app"
                            value={totpCode}
                            onChange={(e) => setTotpCode(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500/50 text-white text-center tracking-[0.5em] font-bold"
                            required
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setRegStep('form')}
                          className="text-zinc-400 hover:text-white text-xs tracking-widest transition-colors uppercase font-bold"
                        >
                          Back to form
                        </button>
                      </div>
                    )}
                  </div>

                  {status && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-center text-sm font-medium ${
                        status.includes('failed') || status.includes('Denied') || status.includes('Invalid') || status.includes('error')
                          ? 'text-red-400'
                          : 'text-blue-400'
                      }`}
                    >
                      {status}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      (isRegistering && regStep === 'qr' && !totpCode) ||
                      (isRegistering && regStep === 'form' && (!email || !password || !name))
                    }
                    className="w-full bg-blue-600 text-white hover:bg-blue-500 py-4 rounded-xl font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                  >
                    {isLoading
                      ? 'Processing...'
                      : !isRegistering
                      ? 'Sign In'
                      : regStep === 'form'
                      ? 'Continue to QR'
                      : 'Verify & Create Account'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="mt-6 flex flex-col gap-3 text-center">
                  {!isRegistering && (
                    <button
                      onClick={() => {
                        setShowForgot(true);
                        setStatus('');
                      }}
                      className="text-zinc-500 hover:text-white text-xs tracking-widest transition-colors uppercase font-bold"
                    >
                      Forgot password?
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsRegistering(!isRegistering);
                      setRegStep('form');
                      setStatus('');
                      setTotpCode('');
                      setQrCodeUrl('');
                    }}
                    className="text-zinc-500 hover:text-white text-xs tracking-widest transition-colors uppercase font-bold mt-2 pt-4 border-t border-zinc-800/50"
                  >
                    {isRegistering ? 'Already have an account? Sign in' : 'Need an account? Register'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAuth(false);
                      setStatus('');
                      setIsRegistering(false);
                      setRegStep('form');
                      setShowForgot(false);
                    }}
                    className="text-zinc-600 hover:text-zinc-400 text-[10px] tracking-widest transition-colors uppercase"
                  >
                    Back to Welcome Screen
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}