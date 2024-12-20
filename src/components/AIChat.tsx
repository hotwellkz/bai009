import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { askOpenAI } from '../lib/ai';
import { db } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { doc, runTransaction } from 'firebase/firestore';

const AIChat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, tokens } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading || tokens < 5) return;

    setIsLoading(true);
    try {
      const success = await runTransaction(db, async (transaction) => {
        const userRef = doc(db, 'profiles', user?.uid || '');
        const userDoc = await transaction.get(userRef);
        
        if (!userDoc.exists() || userDoc.data().tokens < 5) {
          return false;
        }
        
        transaction.update(userRef, {
          tokens: userDoc.data().tokens - 5
        });
        return true;
      });

      if (!success) {
        alert('Недостаточно токенов. Стоимость вопроса: 5 токенов');
        setIsLoading(false);
        return;
      }

      const aiResponse = await askOpenAI(message);
      if (aiResponse.error) {
        throw new Error(aiResponse.error);
      }

      setResponse(aiResponse.text);
    } catch (error) {
      console.error('AI Chat Error:', error);
      setResponse('Извините, произошла ошибка. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/50 rounded-lg p-4 space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Задайте вопрос ИИ учителю..."
          className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none resize-none min-h-[100px]"
          disabled={isLoading || tokens < 5}
        />
        <button
          type="submit"
          disabled={isLoading || tokens < 5}
          className="bg-red-500 hover:bg-red-600 disabled:bg-gray-600 text-white p-2 rounded-lg transition-colors self-start"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
        </button>
      </form>

      {response && (
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: response }} />
        </div>
      )}

      {tokens < 5 && (
        <p className="text-red-500 text-sm text-center">
          У вас недостаточно токенов. Стоимость вопроса: 5 токенов.
        </p>
      )}
    </div>
  );
}

export default AIChat;