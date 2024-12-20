import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit2, Save, X, AlertCircle } from 'lucide-react';
import { db } from '../lib/supabase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

interface User {
  id: string;
  email: string;
  tokens: number;
}

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editTokens, setEditTokens] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  const fetchUsers = async () => {
    try {
      const profilesRef = collection(db, 'profiles');
      const profilesSnapshot = await getDocs(profilesRef);

      const users = profilesSnapshot.docs.map(doc => ({
        id: doc.id,
        email: doc.data().email || '',
        tokens: doc.data().tokens || 0
      }));

      setUsers(users);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1888') {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError('Неверный пароль');
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этого пользователя?')) return;

    setActionLoading(userId);
    setError(null);
    try {
      await deleteDoc(doc(db, 'profiles', userId));
      await deleteDoc(doc(db, 'completed_lessons', userId));

      setUsers(users.filter(user => user.id !== userId));
      setSuccessMessage('Пользователь успешно удален');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to delete user');
      console.error('Error deleting user:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user.id);
    setEditTokens(user.tokens);
  };

  const handleSave = async (userId: string) => {
    setActionLoading(userId);
    setError(null);
    try {
      const userRef = doc(db, 'profiles', userId);
      await updateDoc(userRef, { tokens: editTokens });


      setUsers(users.map(user => 
        user.id === userId ? { ...user, tokens: editTokens } : user
      ));
      setEditingUser(null);
      setSuccessMessage('Токены успешно обновлены');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to update tokens');
      console.error('Error updating tokens:', err);
    } finally {
      setActionLoading(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-xl max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold mb-6 text-center">Вход в панель администратора</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Управление пользователями</h1>
            {successMessage && (
              <div className="text-green-500 flex items-center gap-2 mt-2 sm:mt-0">
                <AlertCircle size={20} />
                {successMessage}
              </div>
            )}
          </div>
          
          {loading ? (
            <p className="text-center text-gray-400">Загрузка...</p>
          ) : error ? (
            <div className="text-red-500 flex items-center gap-2">
              <AlertCircle size={20} />
              {error}
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-700">
                    <th className="pb-4">Email</th>
                    <th className="pb-4">Токены</th>
                    <th className="pb-4">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-700">
                      <td className="py-4">{user.email}</td>
                      <td className="py-4">
                        {editingUser === user.id ? (
                          <input
                            type="number"
                            value={editTokens}
                            onChange={(e) => setEditTokens(Math.max(0, Number(e.target.value)))}
                            className="bg-gray-700 rounded px-2 py-1 w-24"
                          />
                        ) : (
                          user.tokens
                        )}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          {editingUser === user.id ? (
                            <>
                              <button
                                onClick={() => handleSave(user.id)}
                                disabled={actionLoading === user.id}
                                className="p-2 text-green-500 hover:text-green-400 transition-colors"
                              >
                                {actionLoading === user.id ? <span className="animate-spin">⌛</span> : <Save size={20} />}
                              </button>
                              <button
                                onClick={() => setEditingUser(null)}
                                disabled={actionLoading === user.id}
                                className="p-2 text-gray-400 hover:text-gray-300 transition-colors disabled:opacity-50"
                              >
                                <X size={20} />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleEdit(user)}
                              disabled={actionLoading === user.id}
                              className="p-2 text-blue-500 hover:text-blue-400 transition-colors disabled:opacity-50"
                            >
                              <Edit2 size={20} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(user.id)}
                            disabled={actionLoading === user.id}
                            className="p-2 text-red-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;