import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { 
  LogIn, 
  Mail, 
  Lock, 
  Sparkles, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  AlertCircle,
  CheckCircle2,
  UserPlus
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

type AuthMode = 'signin' | 'signup';

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [authError, setAuthError] = useState<string | null>(null);

  const from = (location.state as { from?: Location })?.from?.pathname || '/course-selection';

  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
    return undefined;
  };

  const validatePassword = (password: string, isSignup: boolean): string | undefined => {
    if (!password) return 'Password is required';
    if (isSignup && password.length < 6) return 'Password must be at least 6 characters';
    if (isSignup && password.length > 100) return 'Password must be less than 100 characters';
    return undefined;
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) return 'Passwords do not match';
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;
    
    const passwordError = validatePassword(password, mode === 'signup');
    if (passwordError) newErrors.password = passwordError;
    
    if (mode === 'signup') {
      const confirmError = validateConfirmPassword(password, confirmPassword);
      if (confirmError) newErrors.confirmPassword = confirmError;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'signin') {
        const result = await signIn(email, password);
        if (result.error) {
          setAuthError(result.error);
          toast.error('Login failed', {
            description: result.error,
          });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        const result = await signUp(email, password);
        if (result.error) {
          setAuthError(result.error);
          toast.error('Sign up failed', {
            description: result.error,
          });
        } else {
          toast.success('Account created successfully!');
          navigate(from, { replace: true });
        }
      }
    } catch {
      setAuthError('An unexpected error occurred. Please try again.');
      toast.error('Unexpected error', {
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setErrors({});
    setAuthError(null);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F766E] via-[#115E59] to-[#134E4A] flex items-center justify-center px-4 py-12">
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        aria-label="Go back to home"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </motion.button>

      {/* Login/Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="mx-auto mb-2 w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full flex items-center justify-center"
            >
              {mode === 'signin' ? (
                <LogIn className="w-8 h-8 text-white" />
              ) : (
                <UserPlus className="w-8 h-8 text-white" />
              )}
            </motion.div>
            <CardTitle className="text-2xl font-bold text-center text-white">
              {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-center text-teal-100/80">
              {mode === 'signin' 
                ? 'Sign in to continue your learning adventure' 
                : 'Sign up to start your learning journey'}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Auth Error Message */}
              {authError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </motion.div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-teal-300" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                    }}
                    className={`pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-teal-400 focus:ring-teal-400 ${
                      errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }`}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-300 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-teal-300" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                    }}
                    className={`pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-teal-400 focus:ring-teal-400 ${
                      errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }`}
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-teal-300 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="text-sm text-red-300 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </p>
                )}
                {mode === 'signup' && password.length > 0 && password.length < 6 && (
                  <p className="text-sm text-teal-300/70">
                    Password strength: <span className="text-red-300">Weak</span> (min 6 characters)
                  </p>
                )}
                {mode === 'signup' && password.length >= 6 && (
                  <p className="text-sm text-teal-300/70 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                    Password strength: <span className="text-green-300">Good</span>
                  </p>
                )}
              </div>

              {/* Confirm Password Field (Signup only) */}
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white/90">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-teal-300" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined }));
                      }}
                      className={`pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-teal-400 focus:ring-teal-400 ${
                        errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                      }`}
                      autoComplete="new-password"
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p id="confirm-error" className="text-sm text-red-300 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3 h-3" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Remember Me & Forgot Password (Signin only) */}
              {mode === 'signin' && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" className="border-white/20 data-[state=checked]:bg-teal-400" />
                    <Label htmlFor="remember" className="text-sm text-white/80 cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-teal-300 hover:text-teal-200 transition-colors"
                    onClick={() => toast.info('Password reset functionality coming soon!')}
                  >
                    Forgot password?
                  </motion.button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full py-6 text-lg bg-gradient-to-r from-teal-400 to-cyan-400 text-teal-900 hover:from-teal-300 hover:to-cyan-300 shadow-xl font-semibold"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-teal-900 border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      {mode === 'signin' ? 'Sign In' : 'Create Account'}
                    </>
                  )}
                </Button>
              </motion.div>
              <p className="text-sm text-white/60">
                {mode === 'signin' ? (
                  <>
                    Don't have an account?{' '}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleMode}
                      className="text-teal-300 hover:text-teal-200 font-medium transition-colors"
                    >
                      Sign up
                    </motion.button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleMode}
                      className="text-teal-300 hover:text-teal-200 font-medium transition-colors"
                    >
                      Sign in
                    </motion.button>
                  </>
                )}
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-white/40">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}