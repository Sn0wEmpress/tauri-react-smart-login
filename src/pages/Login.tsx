import { useState } from 'react';
import { useUltraInstinct } from '../utils/ultraInstinct';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [ultraMode, _setUltraMode] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (username === '123' && password === '123') {
        navigate('/greeting');
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const useElementRef = <T extends HTMLElement>(overrides: Partial<{
    enabled: boolean;
    moveDistance: { x: string; y: string };
    animationSpeed: number;
    trailDuration: number;
    returnDelay: number;
  }> = {}) => {
    return useUltraInstinct<T>({
      enabled: ultraMode,
      moveDistance: ultraMode ? { x: '40%', y: '40%' } : { x: '0%', y: '0%' },
      animationSpeed: 100,
      trailDuration: 300,
      returnDelay: 500,
      ...overrides
    });
  };

  const welcomeRef = useElementRef<HTMLHeadingElement>();
  const usernameRef = useElementRef<HTMLInputElement>();
  const passwordRef = useElementRef<HTMLInputElement>();
  const signInRef = useElementRef<HTMLButtonElement>({ animationSpeed: 50, trailDuration: 200, returnDelay: 0 });
  const rememberRef = useElementRef<HTMLLabelElement>();
  const forgotRef = useElementRef<HTMLAnchorElement>();
  const signUpRef = useElementRef<HTMLParagraphElement>();

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-full py-4 overflow-y-auto">
      <div className="w-full max-w-md px-8 py-6 rounded-lg">
        <h2 ref={welcomeRef} data-ultra-instinct="true" className="mb-6 text-2xl font-bold text-center text-white">Smart Login</h2>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-500 bg-red-200 bg-opacity-10 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative w-full">
            <div ref={usernameRef} data-ultra-instinct="true" className="flex">
              <input
                type="text"
                placeholder="Username"
                className="form-input inline-block"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={ultraMode}
              />
              <i className="fa fa-user input-icon group-focus-within:text-primary-500"></i>
            </div>
          </div>

          <div className="relative w-full">
            <div ref={passwordRef} data-ultra-instinct="true" className="flex">
              <input
                type="password"
                placeholder="Password"
                className="form-input inline-block"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={ultraMode}
              />
              <i className="fa fa-lock input-icon group-focus-within:text-primary-500"></i>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="relative">
              <label ref={rememberRef} data-ultra-instinct="true" className="cursor-pointer text-dark-200 hover:text-dark-100 centered-flex group inline-flex items-center">
                <input
                  type="checkbox"
                  className="absolute opacity-0 w-0 h-0 disabled:hover:ring-0 disabled:focus:ring-0"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={ultraMode}
                />
                <span className="custom-checkbox w-5 h-5"></span>
                <span className="ml-2 group-hover:text-dark-100 transition-colors">Remember me</span>
              </label>
            </div>

            <a href="#" ref={forgotRef} data-ultra-instinct="true" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            ref={signInRef}
            data-ultra-instinct="true"
            type="submit"
            disabled={isLoading || ultraMode}
            className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400" ref={signUpRef} data-ultra-instinct="true">
            Don't have an account?{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
