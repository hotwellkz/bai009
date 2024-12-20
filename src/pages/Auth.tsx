import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Mail } from 'lucide-react';
import { auth, db, sendEmailVerification } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { AuthModal } from '../components/AuthModal';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    let errorMessage = '';

    try {
      if (isLogin) {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          navigate('/program');
        } catch (error) {
          if (error.code === 'auth/invalid-login-credentials') {
            errorMessage = 'Неверный email или пароль';
          } else {
            errorMessage = 'Произошла ошибка при входе';
          }
          throw new Error(errorMessage);
        }
      } else {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          // Send verification email
          const { error: verificationError } = await sendEmailVerification(user);
          if (verificationError) {
            throw new Error(verificationError);
          }

          // Create user profile in Firestore
          await setDoc(doc(db, 'profiles', user.uid), {
            email: user.email,
            tokens: 100,
            createdAt: new Date()
          });

          setShowGiftModal(true);
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'Этот email уже используется';
          } else {
            errorMessage = 'Ошибка при регистрации. Пожалуйста, проверьте данные и попробуйте снова';
          }
          throw new Error(errorMessage);
        }
      }
    } catch (err) {
      setError(err.message || 'Произошла ошибка. Пожалуйста, попробуйте позже');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Create or update user profile
      await setDoc(doc(db, 'profiles', result.user.uid), {
        email: result.user.email,
        tokens: 100,
        createdAt: new Date()
      }, { merge: true });

      navigate('/program');
    } catch (error) {
      setError('Ошибка при входе через Google');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
      <div className="container mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Вернуться на главную
        </Link>
        
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            {isLogin ? 'Вход' : 'Регистрация'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                required
              />
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-colors"
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>

            <p className="text-center text-gray-400">
              {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-red-500 hover:text-red-400"
              >
                {isLogin ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </p>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">или</span>
              </div>
            </div>
            
            <button
              onClick={handleGoogleSignIn}
              className="mt-4 w-full bg-white text-gray-900 px-6 py-3 rounded-full text-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Войти через Google</span>
            </button>
          </div>
        </div>
      </div>
      <AuthModal 
        isOpen={showGiftModal} 
        onClose={() => setShowGiftModal(false)}
        showGift={true}
      />
    </div>
  );
};

export default Auth;