import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WordList, Word } from '@/types/vocabulary';

interface VocabularyState {
  wordLists: WordList[];
  
  // Actions
  addWordList: (name: string, description: string) => void;
  updateWordList: (id: string, data: Partial<WordList>) => void;
  deleteWordList: (id: string) => void;
  
  addWord: (listId: string, word: Omit<Word, 'id' | 'createdAt'>) => void;
  updateWord: (listId: string, wordId: string, data: Partial<Word>) => void;
  deleteWord: (listId: string, wordId: string) => void;
}

export const useVocabularyStore = create<VocabularyState>()(
  persist(
    (set) => ({
      wordLists: [
        {
          id: '1',
          name: 'Spanish Basics',
          description: 'Essential Spanish vocabulary for beginners',
          words: [
            {
              id: '101',
              term: 'hola',
              definition: 'hello',
              examples: ['¡Hola! ¿Cómo estás?'],
              tags: ['greeting', 'basic'],
              createdAt: Date.now(),
            },
            {
              id: '102',
              term: 'gracias',
              definition: 'thank you',
              examples: ['Muchas gracias por tu ayuda.'],
              tags: ['courtesy', 'basic'],
              createdAt: Date.now(),
            },
            {
              id: '103',
              term: 'por favor',
              definition: 'please',
              examples: ['Por favor, pásame el libro.'],
              tags: ['courtesy', 'basic'],
              createdAt: Date.now(),
            },
          ],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: '2',
          name: 'Business English',
          description: 'Professional vocabulary for workplace communication',
          words: [
            {
              id: '201',
              term: 'deadline',
              definition: 'a date or time by which something must be completed',
              examples: ['We need to meet the deadline for this project.'],
              tags: ['business', 'time management'],
              createdAt: Date.now(),
            },
            {
              id: '202',
              term: 'agenda',
              definition: 'a list of items to be discussed at a meeting',
              examples: ["Let me check the agenda for today's meeting."],
              tags: ['meetings', 'organization'],
              createdAt: Date.now(),
            },
          ],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
      
      addWordList: (name, description) => {
        set((state) => ({
          wordLists: [
            ...state.wordLists,
            {
              id: Date.now().toString(),
              name,
              description,
              words: [],
              createdAt: Date.now(),
              updatedAt: Date.now(),
            },
          ],
        }));
      },
      
      updateWordList: (id, data) => {
        set((state) => ({
          wordLists: state.wordLists.map((list) =>
            list.id === id
              ? { ...list, ...data, updatedAt: Date.now() }
              : list
          ),
        }));
      },
      
      deleteWordList: (id) => {
        set((state) => ({
          wordLists: state.wordLists.filter((list) => list.id !== id),
        }));
      },
      
      addWord: (listId, wordData) => {
        set((state) => ({
          wordLists: state.wordLists.map((list) => {
            if (list.id === listId) {
              const newWord: Word = {
                id: Date.now().toString(),
                ...wordData,
                createdAt: Date.now(),
              };
              
              return {
                ...list,
                words: [...list.words, newWord],
                updatedAt: Date.now(),
              };
            }
            return list;
          }),
        }));
      },
      
      updateWord: (listId, wordId, data) => {
        set((state) => ({
          wordLists: state.wordLists.map((list) => {
            if (list.id === listId) {
              return {
                ...list,
                words: list.words.map((word) =>
                  word.id === wordId ? { ...word, ...data } : word
                ),
                updatedAt: Date.now(),
              };
            }
            return list;
          }),
        }));
      },
      
      deleteWord: (listId, wordId) => {
        set((state) => ({
          wordLists: state.wordLists.map((list) => {
            if (list.id === listId) {
              return {
                ...list,
                words: list.words.filter((word) => word.id !== wordId),
                updatedAt: Date.now(),
              };
            }
            return list;
          }),
        }));
      },
    }),
    {
      name: 'vocabulary-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);