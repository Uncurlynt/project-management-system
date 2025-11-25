import { create } from 'zustand';
import { getTasks, getBoards, getBoardTasks, getUsers, getTaskById } from '@/api';
import { ITask, IBoard, IUser } from '@/types';

interface TaskStore {
  tasks: ITask[];
  boardTasks: ITask[];
  boards: IBoard[];
  users: IUser[];
  fetchTasks: (controller: AbortController) => Promise<void>;
  fetchBoardTasks: (boardId: number, controller: AbortController) => Promise<void>;
  fetchBoards: (controller: AbortController) => Promise<void>;
  fetchUsers: (controller: AbortController) => Promise<void>;
  addTask: (id: number, boardId: number | null, controller: AbortController) => void;
  editTask: (id: number, boardId: number | null, controller: AbortController) => void;
}

export const useAppStore = create<TaskStore>((set) => ({
  tasks: [],
  boardTasks: [],
  boards: [],
  users: [],

  fetchTasks: async (controller) => {
    try {
      const data = await getTasks({ signal: controller?.signal });
      set({ tasks: data });
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error(err);
      }
    }
  },

  fetchBoardTasks: async (boardId, controller) => {
    try {
      const data = await getBoardTasks(boardId, { signal: controller?.signal });
      set({ boardTasks: data });
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error(err);
      }
    }
  },

  fetchBoards: async (controller) => {
    try {
      const data = await getBoards({ signal: controller?.signal });
      set({ boards: data });
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error(err);
      }
    }
  },

  fetchUsers: async (controller) => {
    try {
      const data = await getUsers({ signal: controller?.signal });
      set({ users: data });
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error(err);
      }
    }
  },

  addTask: async (id, boardId, controller) => {
    const task = await getTaskById(id, { signal: controller?.signal });
    set((state) => ({
      tasks: [...state.tasks, { ...task, boardId }],
      boardTasks: [...state.boardTasks, { ...task, boardId }],
    }));
  },

  editTask: async (id, boardId, controller) => {
    const task = await getTaskById(id, { signal: controller?.signal });
    set((state) => ({
      tasks: [...state.tasks.filter((t) => t.id !== id), { ...task, boardId }],
      boardTasks: [...state.boardTasks.filter((t) => t.id !== id), { ...task, boardId }],
    }));
  },
}));
