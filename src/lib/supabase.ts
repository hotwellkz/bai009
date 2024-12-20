// Re-export Firebase functionality with Supabase-compatible names
import { auth, db, deductTokens, markLessonComplete, getLessonStatus } from './firebase';

// Create a compatibility layer for Supabase-style auth
const supabaseAuth = {
  signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      return { data: { user: userCredential.user }, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
  signUp: async ({ email, password }: { email: string; password: string }) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      return { data: { user: userCredential.user }, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
  signOut: async () => {
    try {
      await auth.signOut();
      return { error: null };
    } catch (error) {
      return { error };
    }
  }
};

// Create a compatibility layer for Supabase-style database operations
const supabaseDb = {
  rpc: async (functionName: string, params: any) => {
    if (functionName === 'deduct_tokens') {
      const success = await deductTokens(params.user_uuid, params.amount);
      return { data: success, error: null };
    }
    return { data: null, error: 'Function not found' };
  },
  from: (table: string) => {
    return {
      select: () => ({
        eq: async (field: string, value: any) => {
          if (table === 'completed_lessons') {
            const isCompleted = await getLessonStatus(value, field);
            return { data: isCompleted ? [{ lesson_id: field }] : [], error: null };
          }
          return { data: [], error: null };
        }
      }),
      insert: async (data: any[]) => {
        if (table === 'completed_lessons') {
          await markLessonComplete(data[0].user_id, data[0].lesson_id);
          return { data, error: null };
        }
        return { data: null, error: 'Table not found' };
      }
    };
  }
};

// Export the compatibility layer as 'supabase'
export const supabase = {
  auth: supabaseAuth,
  ...supabaseDb
};

// Also export the raw Firebase functionality
export {
  auth,
  db,
  deductTokens,
  markLessonComplete,
  getLessonStatus
};