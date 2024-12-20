import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { auth, sendEmailVerification } from '../lib/firebase';

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await auth.currentUser?.updatePassword(newPassword);
      setSuccess('Пароль успешно изменен');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setError('Ошибка при изменении пароля');
      console.error('Password change error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!user) return;
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const { error } = await sendEmailVerification(user);
      if (error) {
        throw new Error(error);
      }
      setSuccess('Письмо для подтверждения отправлено');
    } catch (err) {
      setError('Ошибка при отправке письма. Попробуйте позже.');
      console.error('Verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-red-500/10 rounded-xl">
                <User className="text-red-500" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Профиль</h1>
                <p className="text-gray-400">Управление аккаунтом</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                <Mail className="text-red-500" size={24} />
                <div>
                  <p className="font-medium text-lg">{user?.email}</p>
                  <p className="text-sm text-gray-400">Email для входа в аккаунт</p>
                  {!user.emailVerified && (
                    <div className="mt-2">
                      <p className="text-yellow-500 text-sm">Email не подтвержден</p>
                      <button
                        onClick={handleResendVerification}
                        disabled={loading}
                        className="text-red-500 hover:text-red-400 text-sm mt-1 transition-colors disabled:text-gray-500"
                      >
                        Отправить письмо повторно
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="text-red-500" size={20} />
                  <h2 className="text-xl font-semibold">Изменить пароль</h2>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Новый пароль</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-gray-900/50 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none border border-gray-700/50"
                    required
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm flex items-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                {success && (
                  <div className="text-green-500 text-sm flex items-center gap-2">
                    <AlertCircle size={16} />
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-600 text-white px-6 py-3 rounded-full transition-colors"
                >
                  {loading ? 'Сохранение...' : 'Сохранить'}
                </button>
              </form>

              <div className="pt-4">
                <button
                  onClick={() => signOut()}
                  className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-white px-6 py-3 rounded-full transition-colors border border-gray-600/50"
                >
                  Выйти из аккаунта
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;