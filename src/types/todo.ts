export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: Priority;
  dueDate: string; // ISO string format
  completed: boolean;
  createdAt: string; // ISO string format
}
