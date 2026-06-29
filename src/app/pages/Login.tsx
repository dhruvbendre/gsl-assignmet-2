import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { 
  ArrowLeft,
  Atom,
  Binary,
  CircuitBoard,
  FlaskConical,
  KeyRound,
  Lock,
  Mail, 
  Microscope,
  Rocket,
  Sparkles, 
  Eye, 
  EyeOff, 
  AlertCircle,
  CheckCircle2,
  UserPlus,
  Waves
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

  const fieldShell = (hasError?: boolean) =>
    `group relative overflow-hidden rounded-lg border bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-300 focus-within:-translate-y-0.5 focus-within:bg-white/14 focus-within:shadow-[0_0_28px_rgba(37,99,235,0.24),inset_0_1px_0_rgba(255,255,255,0.18)] ${
      hasError ? 'border-red-400/70 animate-pulse' : 'border-white/14 focus-within:border-blue-300/70'
    }`;

  return (
    <div className="gsl-platform relative min-h-screen overflow-hidden bg-[#050816] px-4 py-8 text-white">
      <div className="absolute inset-0 gsl-aurora" />
      <div className="absolute inset-0 gsl-circuit opacity-70" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[18%] h-24 w-24 rounded-lg border border-cyan-300/20 bg-cyan-300/5 backdrop-blur-sm lab-float" />
        <div className="absolute right-[10%] top-[22%] h-20 w-20 rotate-12 rounded-lg border border-amber-200/20 bg-amber-200/5 backdrop-blur-sm lab-float lab-delay-4" />
        <div className="absolute bottom-[13%] left-[15%] h-16 w-16 -rotate-12 rounded-lg border border-emerald-200/20 bg-emerald-200/5 backdrop-blur-sm lab-float lab-delay-7" />
        {[
          { Icon: Atom, className: 'left-[16%] top-[34%] text-cyan-200/60' },
          { Icon: Binary, className: 'right-[17%] top-[38%] text-amber-200/60' },
          { Icon: FlaskConical, className: 'left-[28%] bottom-[18%] text-emerald-200/60' },
          { Icon: CircuitBoard, className: 'right-[28%] bottom-[19%] text-violet-200/60' },
        ].map(({ Icon, className }, index) => (
          <motion.div
            key={index}
            className={`absolute ${className}`}
            animate={{ y: [0, -16, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut', delay: index * 0.35 }}
          >
            <Icon className="h-10 w-10" />
          </motion.div>
        ))}
        <div className="lab-scanline absolute inset-x-0 top-0 h-1/2" />
      </div>

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate('/')}
        className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-sm font-bold text-white/80 backdrop-blur-md transition-colors hover:text-white"
        aria-label="Go back to home"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Home</span>
      </motion.button>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-8 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.section
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:block"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/8 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-100 backdrop-blur-md">
            <Microscope className="h-4 w-4" />
            Innovation Lab Access
          </div>
          <h1 className="gsl-display max-w-xl text-5xl font-black leading-[0.98] text-white xl:text-6xl">
            GetSetLearn Lab
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium leading-8 text-blue-100/82">
            Step into a mission control built for young scientists, circuit builders, and curious problem solvers.
          </p>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {[
              ['Lab ID', 'STEM-24'],
              ['XP Ready', '+500'],
              ['Mission', 'Active'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/12 bg-white/9 p-4 shadow-xl backdrop-blur-lg">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-300">{label}</div>
                <div className="mt-2 font-lab-display text-xl text-white">{value}</div>
              </div>
            ))}
          </div>
          <div className="relative mt-10 h-64 max-w-xl overflow-hidden rounded-lg border border-white/12 bg-slate-950/52 shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 lab-grid-overlay opacity-60" />
            <motion.div
              className="absolute left-1/2 top-1/2 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-200/24 bg-cyan-200/8 shadow-[0_0_44px_rgba(34,211,238,0.24)]"
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-emerald-300 text-slate-950 shadow-xl">
                <Rocket className="h-11 w-11" />
              </div>
            </motion.div>
            <div className="absolute left-8 top-8 h-12 w-28 rounded-md border border-cyan-200/20 bg-white/8" />
            <div className="absolute bottom-8 right-8 h-12 w-32 rounded-md border border-emerald-200/20 bg-white/8" />
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto w-full max-w-md"
        >
        <Card className="gsl-card-shine overflow-hidden rounded-lg border-white/16 bg-white/10 text-white shadow-[0_30px_90px_rgba(0,0,0,0.52),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-2xl">
          <CardHeader className="space-y-1 pb-5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-300 to-emerald-300 text-slate-950 shadow-[0_0_34px_rgba(34,211,238,0.38)]"
            >
              {mode === 'signin' ? (
                <KeyRound className="h-8 w-8" />
              ) : (
                <UserPlus className="h-8 w-8" />
              )}
            </motion.div>
            <CardTitle className="gsl-display text-center text-3xl font-black text-white">
              {mode === 'signin' ? 'Enter the Lab' : 'Create Lab ID'}
            </CardTitle>
            <CardDescription className="text-center font-medium text-blue-100/76">
              {mode === 'signin' 
                ? 'Continue your learning mission from the command deck.' 
                : 'Unlock your first mission and start earning XP.'}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
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

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-black uppercase tracking-[0.18em] text-blue-100/72">
                  Lab Email
                </Label>
                <div className={fieldShell(!!errors.email)}>
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="scientist@getsetlearn.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                    }}
                    className="h-13 border-0 bg-transparent pl-10 text-white placeholder:text-white/34 focus-visible:ring-0"
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

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-black uppercase tracking-[0.18em] text-blue-100/72">
                  Access Code
                </Label>
                <div className={fieldShell(!!errors.password)}>
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                    }}
                    className="h-13 border-0 bg-transparent pl-10 pr-10 text-white placeholder:text-white/34 focus-visible:ring-0"
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-200 transition-colors hover:text-white"
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
                  <p className="text-sm text-amber-200/80">
                    Password strength: <span className="text-red-300">Weak</span> (min 6 characters)
                  </p>
                )}
                {mode === 'signup' && password.length >= 6 && (
                  <p className="text-sm text-emerald-200/80 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                    Password strength: <span className="text-green-300">Good</span>
                  </p>
                )}
              </div>

              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-xs font-black uppercase tracking-[0.18em] text-blue-100/72">
                    Confirm Code
                  </Label>
                  <div className={fieldShell(!!errors.confirmPassword)}>
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined }));
                      }}
                      className="h-13 border-0 bg-transparent pl-10 text-white placeholder:text-white/34 focus-visible:ring-0"
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

              {mode === 'signin' && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" className="border-white/24 data-[state=checked]:border-cyan-300 data-[state=checked]:bg-cyan-300" />
                    <Label htmlFor="remember" className="text-sm text-white/80 cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-cyan-200 transition-colors hover:text-white"
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
                  className="gsl-ripple h-13 w-full rounded-lg bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300 text-base font-black text-slate-950 shadow-[0_18px_38px_rgba(34,211,238,0.22)] hover:from-cyan-200 hover:to-emerald-200"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 rounded-full border-2 border-slate-950 border-t-transparent"
                    />
                  ) : (
                    <>
                      {mode === 'signin' ? <Rocket className="mr-2 h-5 w-5" /> : <Sparkles className="mr-2 h-5 w-5" />}
                      {mode === 'signin' ? 'Continue Learning' : 'Create Lab Access'}
                    </>
                  )}
                </Button>
              </motion.div>
              <p className="text-sm text-white/64">
                {mode === 'signin' ? (
                  <>
                    Don't have an account?{' '}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleMode}
                      className="font-bold text-cyan-200 transition-colors hover:text-white"
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
                      className="font-bold text-cyan-200 transition-colors hover:text-white"
                    >
                      Sign in
                    </motion.button>
                  </>
                )}
              </p>
            </CardFooter>
          </form>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs text-white/48 backdrop-blur-md">
            <Waves className="h-3.5 w-3.5" />
            Secure lab session initialized
          </p>
        </motion.div>
      </motion.div>
      </div>
    </div>
  );
}
