import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Memo } from '@/types/memo';

interface MemoStore {
  memos: Memo[];
  addMemo: (memo: Memo) => void;
  updateMemo: (memo: Memo) => void;
  deleteMemo: (id: string) => void;
}

export const useMemoStore = create<MemoStore>()(
  persist(
    (set) => ({
      memos: [],
      addMemo: (memo: Memo) =>
        set((state: MemoStore) => ({
          memos: [...state.memos, memo],
        })),
      updateMemo: (memo: Memo) =>
        set((state: MemoStore) => ({
          memos: state.memos.map((m: Memo) => (m.id === memo.id ? memo : m)),
        })),
      deleteMemo: (id: string) =>
        set((state: MemoStore) => ({
          memos: state.memos.filter((m: Memo) => m.id !== id),
        })),
    }),
    {
      name: 'memo-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 