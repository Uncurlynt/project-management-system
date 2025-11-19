import { IAssignee } from './users';

export type TPriority = 'High' | 'Medium' | 'Low';

export type TStatus = 'Backlog' | 'InProgress' | 'Done';

export interface ITask {
  id: number;
  title: string;
  description: string;
  priority: TPriority;
  status: TStatus;
  assignee?: IAssignee;
  assigneeId?: number;
  boardId: number;
  boardName: string;
}
