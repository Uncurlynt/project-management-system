import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ITask } from '@/types';

type TModalMode = 'board' | 'all' | 'default';

type TaskModalState = {
  modalMode: TModalMode;
  isOpen: boolean;
  currentTask: Partial<ITask> | null;
  openModal: (task: ITask | null, mode: TModalMode) => void;
  closeModal: () => void;
};

export const useTaskModalStore = create<TaskModalState>()(
  persist(
    (set) => ({
      modalMode: 'default',
      isOpen: false,
      currentTask: null,
      openModal: (task, mode) => set({ isOpen: true, currentTask: task, modalMode: mode }),
      closeModal: () => set({ isOpen: false }),
    }),
    {
      name: 'task-modal-store',
      partialize: (state) => ({
        modalMode: state.modalMode,
        currentTask: state.currentTask,
      }),
    }
  )
);
