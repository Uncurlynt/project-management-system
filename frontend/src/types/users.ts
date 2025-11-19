export interface IAssignee {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
}

export interface IUser extends IAssignee {
  description: string;
  teamId: number;
  teamName: string;
  tasksCount: number;
}
