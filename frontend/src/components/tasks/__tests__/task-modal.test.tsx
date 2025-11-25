import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskModal } from '../task-modal';
import { useTaskModalStore, useAppStore } from '@/stores';
import type { ReactNode } from 'react';

vi.mock('@/stores', () => ({
  useTaskModalStore: vi.fn(),
  useAppStore: vi.fn(),
}));

vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DialogContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DialogHeader: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock('react-router', () => ({
  NavLink: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('TaskModal', () => {
  const mockCloseModal = vi.fn();
  const mockFetchBoards = vi.fn();
  const mockFetchUsers = vi.fn();
  const mockAddTask = vi.fn();
  const mockEditTask = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useTaskModalStore as any).mockReturnValue({
      modalMode: 'default',
      isOpen: true,
      closeModal: mockCloseModal,
      currentTask: null,
    });

    (useAppStore as any).mockReturnValue({
      boards: [
        { id: 1, name: 'Project 1' },
        { id: 2, name: 'Project 2' },
      ],
      fetchBoards: mockFetchBoards,
      users: [
        { id: 1, fullName: 'User 1' },
        { id: 2, fullName: 'User 2' },
      ],
      fetchUsers: mockFetchUsers,
      addTask: mockAddTask,
      editTask: mockEditTask,
    });

    Storage.prototype.getItem = vi.fn(() => null);
    Storage.prototype.setItem = vi.fn();
    Storage.prototype.removeItem = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders create task form when no currentTask is provided', () => {
    render(<TaskModal />);

    expect(screen.getByText('Создание тикета')).toBeTruthy();
    expect(screen.getByLabelText('Название тикета')).toBeTruthy();
    expect(screen.getByLabelText('Описание')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Создать' })).toBeTruthy();
  });

  it('renders edit task form when currentTask is provided', () => {
    (useTaskModalStore as any).mockReturnValue({
      modalMode: 'default',
      isOpen: true,
      closeModal: mockCloseModal,
      currentTask: {
        id: 1,
        title: 'Existing Task',
        description: 'Existing Description',
        priority: 'Medium',
        status: 'InProgress',
        assignee: { id: 1 },
        boardId: 1,
      },
    });

    render(<TaskModal />);

    expect(screen.getByText('Редактирование тикета')).toBeTruthy();
    expect(screen.getByDisplayValue('Existing Task')).toBeTruthy();
    expect(screen.getByDisplayValue('Existing Description')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Изменить' })).toBeTruthy();
  });

  it('resets the form when reset button is clicked', async () => {
    const user = userEvent.setup();

    render(<TaskModal />);

    await user.type(screen.getByLabelText('Название тикета'), 'Test Task');
    await user.click(screen.getByRole('button', { name: 'Сбросить' }));

    expect(localStorage.removeItem).toHaveBeenCalled();
  });

  it('saves form data to localStorage when values change', async () => {
    const user = userEvent.setup();

    render(<TaskModal />);

    await user.type(screen.getByLabelText('Название тикета'), 'Draft Task');

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'task-form-create',
        JSON.stringify({
          title: 'Draft Task',
          description: '',
          priority: 'Low',
          status: 'Backlog',
          assigneeId: '-1',
          boardId: '-1',
        })
      );
    });
  });
});
