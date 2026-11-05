import React, { useEffect, useState } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { FamiliaLogo } from '../ui/FamiliaLogo';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Check,
} from 'lucide-react';

// Strict regex patterns for production form validation
const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGEX_FULL_NAME = /^[a-zA-Z\s'-]{2,50}$/;
const REGEX_PASSWORD_SIGNUP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&_\-.]{8,}$/;
const REGEX_PASSWORD_SIGNIN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&_\-.]{6,}$/;

export const AccountPage: React.FC = () => {
  const { showToast } = useEcommerce();

  // User session state
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
  } | null>(() => {
    try {
      const saved = localStorage.getItem('familia_user_v1');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [accountMessage, setAccountMessage] = useState('');

  useEffect(() => {
    if (!accountMessage) return;
    const timer = window.setTimeout(() => setAccountMessage(''), 2500);
    return () => window.clearTimeout(timer);
  }, [accountMessage]);

  // Sign In form state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [signInErrors, setSignInErrors] = useState<{ email?: string; password?: string }>({});
  const [signInTouched, setSignInTouched] = useState<{ email?: boolean; password?: boolean }>({});

  // Create Account form state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [signUpErrors, setSignUpErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [signUpTouched, setSignUpTouched] = useState<{ name?: boolean; email?: boolean; password?: boolean }>({});

  // Forgot password modal
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotError, setForgotError] = useState('');

  // Regex validation helpers
  const validateSignInField = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      const val = value.trim();
      if (!val) return 'Email address is required.';
      if (!REGEX_EMAIL.test(val)) return 'Please enter a valid email address (e.g. name@domain.com).';
      return undefined;
    }
    if (field === 'password') {
      if (!value) return 'Password is required.';
      if (!REGEX_PASSWORD_SIGNIN.test(value)) {
        return 'Password must be at least 6 characters with letters and numbers.';
      }
      return undefined;
    }
    return undefined;
  };

  const validateSignUpField = (field: 'name' | 'email' | 'password', value: string) => {
    if (field === 'name') {
      const val = value.trim();
      if (!val) return 'Full name is required.';
      if (!REGEX_FULL_NAME.test(val)) {
        return 'Name must contain only letters, spaces, and hyphens (2-50 characters).';
      }
      return undefined;
    }
    if (field === 'email') {
      const val = value.trim();
      if (!val) return 'Email address is required.';
      if (!REGEX_EMAIL.test(val)) return 'Please enter a valid email address (e.g. name@domain.com).';
      return undefined;
    }
    if (field === 'password') {
      if (!value) return 'Password is required.';
      if (!REGEX_PASSWORD_SIGNUP.test(value)) {
        return 'Password must be at least 8 characters and include at least one letter and one number.';
      }
      return undefined;
    }
    return undefined;
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInTouched({ email: true, password: true });

    const emailErr = validateSignInField('email', signInEmail);
    const passErr = validateSignInField('password', signInPassword);
    const errors: { email?: string; password?: string } = {};

    if (emailErr) errors.email = emailErr;
    if (passErr) errors.password = passErr;

    setSignInErrors(errors);

    if (Object.keys(errors).length === 0) {
      const user = {
        name: signInEmail.split('@')[0].replace('.', ' '),
        email: signInEmail.trim(),
      };
      setCurrentUser(user);
      localStorage.setItem('familia_user_v1', JSON.stringify(user));
      showToast(`Welcome back, ${user.name}!`, 'success');
      setAccountMessage('You have signed in successfully.');
      setSignInEmail('');
      setSignInPassword('');
      setSignInErrors({});
      setSignInTouched({});
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpTouched({ name: true, email: true, password: true });

    const nameErr = validateSignUpField('name', signUpName);
    const emailErr = validateSignUpField('email', signUpEmail);
    const passErr = validateSignUpField('password', signUpPassword);
    const errors: { name?: string; email?: string; password?: string } = {};

    if (nameErr) errors.name = nameErr;
    if (emailErr) errors.email = emailErr;
    if (passErr) errors.password = passErr;

    setSignUpErrors(errors);

    if (Object.keys(errors).length === 0) {
      const user = {
        name: signUpName.trim(),
        email: signUpEmail.trim(),
      };
      setCurrentUser(user);
      localStorage.setItem('familia_user_v1', JSON.stringify(user));
      showToast(`Account created! Welcome to Familia, ${user.name}!`, 'success');
      setAccountMessage('Your account has been created successfully.');
      setSignUpName('');
      setSignUpEmail('');
      setSignUpPassword('');
      setSignUpErrors({});
      setSignUpTouched({});
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAccountMessage('');
    localStorage.removeItem('familia_user_v1');
    showToast('Signed out of session.', 'info');
  };

  const isSignInEmailValid = signInTouched.email && !signInErrors.email && REGEX_EMAIL.test(signInEmail.trim());
  const isSignInPasswordValid = signInTouched.password && !signInErrors.password && REGEX_PASSWORD_SIGNIN.test(signInPassword);

  const isSignUpNameValid = signUpTouched.name && !signUpErrors.name && REGEX_FULL_NAME.test(signUpName.trim());
  const isSignUpEmailValid = signUpTouched.email && !signUpErrors.email && REGEX_EMAIL.test(signUpEmail.trim());
  const isSignUpPasswordValid = signUpTouched.password && !signUpErrors.password && REGEX_PASSWORD_SIGNUP.test(signUpPassword);

  return (
    <div className="py-12 bg-[#F8FBFA]" aria-label="Account Section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Header */}
        <div className="text-center mb-10">
          <FamiliaLogo size="lg" className="justify-center" />
          <p className="text-xs text-[#607985] mt-2 tracking-wider uppercase font-semibold">
            One Account. Every Generation.
          </p>
        </div>

        {/* Logged In Dashboard View */}
        {currentUser ? (
          <div className="bg-white rounded-3xl border border-[#D9E8EC] p-6 sm:p-10 shadow-xs max-w-3xl mx-auto">
            {accountMessage && (
              <div role="status" className="mb-6 flex items-center justify-center gap-2 rounded-2xl border border-[#B8DED0] bg-[#B8DED0]/25 px-4 py-4 text-sm font-semibold text-[#254653]">
                <CheckCircle2 className="h-5 w-5 text-[#477C82]" />
                {accountMessage}
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#B8DED0]/50 border border-[#477C82] flex items-center justify-center text-[#477C82] font-serif font-bold text-xl uppercase">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#254653] capitalize">
                    {currentUser.name}
                  </h2>
                  <p className="text-xs text-[#607985]">{currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="self-start sm:self-auto px-4 py-2 rounded-full border border-gray-300 text-xs font-semibold text-gray-600 hover:text-red-600 hover:border-red-300 transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>

          </div>
        ) : (
          /* Two-Column Sign In & Create Account matching Screen 12 */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Card: Sign In (Screen 12) */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D9E8EC] shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#254653]">Sign In</h2>
                <p className="text-xs text-[#607985] mt-1 mb-6">Welcome back to your Familia account.</p>

                <form onSubmit={handleSignIn} className="space-y-4" noValidate>
                  {/* Email */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-medium text-[#254653]" htmlFor="signin-email">
                        Email address <span className="text-[#FF8F86]">*</span>
                      </label>
                      {isSignInEmailValid && (
                        <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Valid email
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        id="signin-email"
                        type="email"
                        value={signInEmail}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSignInEmail(val);
                          setSignInTouched((prev) => ({ ...prev, email: true }));
                          const err = validateSignInField('email', val);
                          setSignInErrors((prev) => ({ ...prev, email: err }));
                        }}
                        onBlur={() => {
                          setSignInTouched((prev) => ({ ...prev, email: true }));
                          const err = validateSignInField('email', signInEmail);
                          setSignInErrors((prev) => ({ ...prev, email: err }));
                        }}
                        placeholder="e.g. maria@familia.com"
                        className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all ${
                          signInTouched.email && signInErrors.email
                            ? 'bg-rose-50/20 border border-rose-400 focus:ring-2 focus:ring-rose-100 text-rose-900'
                            : isSignInEmailValid
                            ? 'bg-emerald-50/20 border border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                            : 'bg-[#F8FBFA] border border-[#D9E8EC] focus:border-[#477C82] focus:bg-white'
                        }`}
                      />
                    </div>
                    {signInTouched.email && signInErrors.email && (
                      <p className="text-[11px] text-rose-600 mt-1 pl-1 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {signInErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Password with Show/Hide toggle */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-medium text-[#254653]" htmlFor="signin-password">
                        Password <span className="text-[#FF8F86]">*</span>
                      </label>
                      {isSignInPasswordValid && (
                        <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Valid
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        id="signin-password"
                        type={showSignInPassword ? 'text' : 'password'}
                        value={signInPassword}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSignInPassword(val);
                          setSignInTouched((prev) => ({ ...prev, password: true }));
                          const err = validateSignInField('password', val);
                          setSignInErrors((prev) => ({ ...prev, password: err }));
                        }}
                        onBlur={() => {
                          setSignInTouched((prev) => ({ ...prev, password: true }));
                          const err = validateSignInField('password', signInPassword);
                          setSignInErrors((prev) => ({ ...prev, password: err }));
                        }}
                        placeholder="••••••••"
                        className={`w-full px-4 py-2.5 pr-10 rounded-xl text-sm outline-none transition-all ${
                          signInTouched.password && signInErrors.password
                            ? 'bg-rose-50/20 border border-rose-400 focus:ring-2 focus:ring-rose-100 text-rose-900'
                            : isSignInPasswordValid
                            ? 'bg-emerald-50/20 border border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                            : 'bg-[#F8FBFA] border border-[#D9E8EC] focus:border-[#477C82] focus:bg-white'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignInPassword(!showSignInPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-[#477C82]"
                        aria-label={showSignInPassword ? 'Hide password' : 'Show password'}
                      >
                        {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {signInTouched.password && signInErrors.password && (
                      <p className="text-[11px] text-rose-600 mt-1 pl-1 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {signInErrors.password}
                      </p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-[#607985]">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-[#D9E8EC] text-[#477C82] focus:ring-[#477C82]"
                      />
                      <span>Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsForgotModalOpen(true)}
                      className="text-[#477C82] hover:underline font-medium cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Sign In button */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#477C82] hover:bg-[#39656a] text-white font-semibold text-sm transition-all shadow-xs cursor-pointer active:scale-98"
                  >
                    Sign In
                  </button>
                </form>
              </div>

              {/* Secure Trust Guarantee (replaces demo credentials box) */}
              <div className="pt-8 mt-8 border-t border-[#D9E8EC] text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-[#607985]">
                  <CheckCircle2 className="w-4 h-4 text-[#477C82]" />
                  <span>256-bit SSL encrypted login protection</span>
                </div>
              </div>
            </div>

            {/* Right Card: Create Account (Screen 12) */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D9E8EC] shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#254653]">Create Account</h2>
                <p className="text-xs text-[#607985] mt-1 mb-6">Join our family.</p>
                <p className="text-xs text-[#607985] mt-1 mb-6">Join our family!</p>

                <form onSubmit={handleSignUp} className="space-y-4" noValidate>
                  {/* Full Name */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-medium text-[#254653]" htmlFor="signup-name">
                        Full name <span className="text-[#FF8F86]">*</span>
                      </label>
                      {isSignUpNameValid && (
                        <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Valid
                        </span>
                      )}
                    </div>
                    <input
                      id="signup-name"
                      type="text"
                      value={signUpName}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^a-zA-Z\s'-]/g, '').slice(0, 50);
                        setSignUpName(val);
                        setSignUpTouched((prev) => ({ ...prev, name: true }));
                        const err = validateSignUpField('name', val);
                        setSignUpErrors((prev) => ({ ...prev, name: err }));
                      }}
                      onBlur={() => {
                        setSignUpTouched((prev) => ({ ...prev, name: true }));
                        const err = validateSignUpField('name', signUpName);
                        setSignUpErrors((prev) => ({ ...prev, name: err }));
                      }}
                      placeholder="e.g. Elena Rostova"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all ${
                        signUpTouched.name && signUpErrors.name
                          ? 'bg-rose-50/20 border border-rose-400 focus:ring-2 focus:ring-rose-100 text-rose-900'
                          : isSignUpNameValid
                          ? 'bg-emerald-50/20 border border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                          : 'bg-[#F8FBFA] border border-[#D9E8EC] focus:border-[#477C82] focus:bg-white'
                      }`}
                    />
                    {signUpTouched.name && signUpErrors.name && (
                      <p className="text-[11px] text-rose-600 mt-1 pl-1 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {signUpErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-medium text-[#254653]" htmlFor="signup-email">
                        Email address <span className="text-[#FF8F86]">*</span>
                      </label>
                      {isSignUpEmailValid && (
                        <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Valid email
                        </span>
                      )}
                    </div>
                    <input
                      id="signup-email"
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSignUpEmail(val);
                        setSignUpTouched((prev) => ({ ...prev, email: true }));
                        const err = validateSignUpField('email', val);
                        setSignUpErrors((prev) => ({ ...prev, email: err }));
                      }}
                      onBlur={() => {
                        setSignUpTouched((prev) => ({ ...prev, email: true }));
                        const err = validateSignUpField('email', signUpEmail);
                        setSignUpErrors((prev) => ({ ...prev, email: err }));
                      }}
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all ${
                        signUpTouched.email && signUpErrors.email
                          ? 'bg-rose-50/20 border border-rose-400 focus:ring-2 focus:ring-rose-100 text-rose-900'
                          : isSignUpEmailValid
                          ? 'bg-emerald-50/20 border border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                          : 'bg-[#F8FBFA] border border-[#D9E8EC] focus:border-[#477C82] focus:bg-white'
                      }`}
                    />
                    {signUpTouched.email && signUpErrors.email && (
                      <p className="text-[11px] text-rose-600 mt-1 pl-1 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {signUpErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-medium text-[#254653]" htmlFor="signup-password">
                        Password <span className="text-[#FF8F86]">*</span>
                      </label>
                      {isSignUpPasswordValid && (
                        <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Strong
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        id="signup-password"
                        type={showSignUpPassword ? 'text' : 'password'}
                        value={signUpPassword}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSignUpPassword(val);
                          setSignUpTouched((prev) => ({ ...prev, password: true }));
                          const err = validateSignUpField('password', val);
                          setSignUpErrors((prev) => ({ ...prev, password: err }));
                        }}
                        onBlur={() => {
                          setSignUpTouched((prev) => ({ ...prev, password: true }));
                          const err = validateSignUpField('password', signUpPassword);
                          setSignUpErrors((prev) => ({ ...prev, password: err }));
                        }}
                        placeholder="At least 8 characters (letters + numbers)"
                        className={`w-full px-4 py-2.5 pr-10 rounded-xl text-sm outline-none transition-all ${
                          signUpTouched.password && signUpErrors.password
                            ? 'bg-rose-50/20 border border-rose-400 focus:ring-2 focus:ring-rose-100 text-rose-900'
                            : isSignUpPasswordValid
                            ? 'bg-emerald-50/20 border border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                            : 'bg-[#F8FBFA] border border-[#D9E8EC] focus:border-[#477C82] focus:bg-white'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-[#477C82]"
                        aria-label={showSignUpPassword ? 'Hide password' : 'Show password'}
                      >
                        {showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {signUpTouched.password && signUpErrors.password ? (
                      <p className="text-[11px] text-rose-600 mt-1 pl-1 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {signUpErrors.password}
                      </p>
                    ) : (
                      <p className="text-[10px] text-[#607985] mt-1 pl-1">
                        Must contain at least 8 characters with at least one letter and one number.
                      </p>
                    )}
                  </div>

                  {/* Terms */}
                  <p className="text-[11px] text-[#607985] pt-1">
                    By registering you agree to Familia&apos;s Terms of Service and Privacy Policy.
                  </p>

                  {/* Create Account button (Screen 12) */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#477C82] hover:bg-[#39656a] text-white font-semibold text-sm transition-all shadow-xs cursor-pointer"
                  >
                    Create Account
                  </button>
                </form>
              </div>

              {/* Bottom benefits */}
              <div className="pt-6 mt-6 border-t border-[#D9E8EC] text-xs text-[#607985]">
                <ul className="space-y-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#477C82]" />
                    <span>Save your whole family&apos;s sizing preferences</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#477C82]" />
                    <span>Exclusive early access to seasonal family drops</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex justify-center items-center">
          <div className="fixed inset-0 bg-[#254653]/60 backdrop-blur-xs" onClick={() => setIsForgotModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-[#D9E8EC] z-10 animate-in fade-in zoom-in-95">
            <h3 className="font-serif text-xl font-bold text-[#254653] mb-2">Reset Password</h3>
            <p className="text-xs text-[#607985] mb-4">
              Enter your email and we&apos;ll send instructions to reset your password.
            </p>
            {forgotSuccess ? (
              <div className="bg-[#B8DED0]/30 border border-[#B8DED0] p-4 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-6 h-6 text-[#477C82] mx-auto" />
                <p className="text-xs font-semibold text-[#254653]">Password reset instructions simulated!</p>
                <button
                  onClick={() => setIsForgotModalOpen(false)}
                  className="px-4 py-1.5 rounded-full bg-[#477C82] text-white text-xs font-medium"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (REGEX_EMAIL.test(forgotEmail.trim())) {
                    setForgotSuccess(true);
                    setForgotError('');
                  } else {
                    setForgotError('Please enter a valid email address.');
                  }
                }}
                className="space-y-3"
              >
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => {
                    setForgotEmail(e.target.value);
                    if (forgotError) setForgotError('');
                  }}
                  placeholder="Enter registered email"
                  className="w-full px-4 py-2.5 rounded-xl text-sm border border-[#D9E8EC] outline-none focus:border-[#477C82]"
                  required
                />
                {forgotError && (
                  <p className="text-[11px] text-rose-600">{forgotError}</p>
                )}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#477C82] text-white text-xs font-semibold"
                  >
                    Send Instructions
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
