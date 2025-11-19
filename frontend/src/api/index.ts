import { TStatus } from '@/types';
import { axiosInstance } from './client';
import { toast } from 'sonner';

export async function getBoards({ signal }: { signal: AbortSignal }) {
  try {
    const response = await axiosInstance.get('/boards', { signal });
    return response.data;
  } catch (error) {
    console.error('Не получилось получить информацию о проектах:', error);
    throw error;
  }
}

export async function getTasks({ signal }: { signal: AbortSignal }) {
  try {
    const response = await axiosInstance.get('/tasks', { signal });
    return response.data;
  } catch (error) {
    console.error('Не получилось получить информацию о тикетах:', error);
    throw error;
  }
}

export async function getBoardTasks(boardId: number, { signal }: { signal: AbortSignal }) {
  try {
    const response = await axiosInstance.get(`/boards/${boardId}`, { signal });
    return response.data;
  } catch (error) {
    console.error('Не получилось получить информацию о тикетах в проекте:', error);
    throw error;
  }
}

export async function createTask(data: any, { signal }: { signal: AbortSignal }) {
  try {
    const response = await axiosInstance.post('/tasks/create', { ...data }, { signal });
    return response.data;
  } catch (error) {
    const errorText = 'Не получилось создать тикет';
    console.error(`${errorText}: ${error}`);
    toast.error(errorText);
    throw error;
  }
}

export async function updateTask(data: any, id: number, { signal }: { signal: AbortSignal }) {
  try {
    const response = await axiosInstance.put(`/tasks/update/${id}`, { ...data }, { signal });
    return response.data;
  } catch (error) {
    const errorText = 'Не получилось изменить тикет';
    console.error(`${errorText}: ${error}`);
    toast.error(errorText);
    throw error;
  }
}

export async function updateTaskStatus(
  id: number,
  status: TStatus,
  { signal }: { signal: AbortSignal }
) {
  try {
    const response = await axiosInstance.put(`/tasks/updateStatus/${id}`, { status }, { signal });
    return response.data;
  } catch (error) {
    console.error('Не получилось изменить статус тикета:', error);
    throw error;
  }
}

export async function getUsers({ signal }: { signal: AbortSignal }) {
  try {
    const response = await axiosInstance.get('/users', { signal });
    return response.data;
  } catch (error) {
    console.error('Не получилось получить информацию о пользователях:', error);
    throw error;
  }
}

export async function getTaskById(id: number, { signal }: { signal: AbortSignal }) {
  try {
    const response = await axiosInstance.get(`/tasks/${id}`, { signal });
    return response.data;
  } catch (error) {
    console.error('Не получилось получить информацию о задаче:', error);
    throw error;
  }
}
