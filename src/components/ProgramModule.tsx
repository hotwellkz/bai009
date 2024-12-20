import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/supabase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

interface Lesson {
  title: string;
  content: string[];
}

interface ProgramModuleProps {
  title: string;
  lessons: Lesson[];
}

const ProgramModule: React.FC<ProgramModuleProps> = ({ title, lessons }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [completedLessons, setCompletedLessons] = React.useState<string[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      const lessonsRef = collection(db, 'completed_lessons');
      const q = query(lessonsRef, where('userId', '==', user.uid));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const completed = snapshot.docs.map(doc => doc.data().lessonId);
        setCompletedLessons(completed);
      });
      
      return () => unsubscribe();
    }
  }, [user]);

  const handleLessonClick = (lessonTitle: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (lessonTitle === 'Урок 1.1: Кто такой бизнес-аналитик?') {
      navigate('/lesson/1.1');
    }
  };

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-red-500/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-900/50 hover:bg-gray-900/70 transition-colors relative"
      >
        <h3 className="text-xl font-semibold text-left">{title}</h3>
        <div className="flex items-center space-x-2">
          {lessons.some(lesson => 
            lesson.title === 'Урок 1.1: Кто такой бизнес-аналитик?' && 
            completedLessons.includes('1.1')
          ) && (
            <CheckCircle className="text-green-500" size={20} />
          )}
          {isOpen ? (
            <ChevronUp className="text-red-500" />
          ) : (
            <ChevronDown className="text-red-500" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 py-4 space-y-6 bg-black/30">
          {lessons.map((lesson, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleLessonClick(lesson.title)}
                  className="text-lg font-medium text-red-500 hover:text-red-400 transition-colors"
                >
                  {lesson.title}
                </button>
                {completedLessons.includes('1.1') && lesson.title === 'Урок 1.1: Кто такой бизнес-аналитик?' && (
                  <CheckCircle className="text-green-500" size={20} />
                )}
              </div>
              <ul className="space-y-2 text-gray-300">
                {lesson.content.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-3 bg-red-500/30 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgramModule;