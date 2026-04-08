import { create } from 'zustand';
import type { Todo, Priority } from '../types/todo';
import { loadTodos, saveTodos } from '../utils/storage';

export interface FilterState {
  category: string | 'all';
  priority: Priority | 'all';
  status: 'all' | 'completed' | 'active';
  searchQuery: string;
}

interface TodoStore {
  todos: Todo[];
  filters: FilterState;
  
  // Actions
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updatedTodo: Partial<Todo>) => void;
  toggleComplete: (id: string) => void;
  
  // Filter Actions
  setFilter: (key: keyof FilterState, value: string) => void;
  setSearchQuery: (query: string) => void;
  
  // Selectors/Computed
  getFilteredTodos: () => Todo[];
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: loadTodos(),
  filters: {
    category: 'all',
    priority: 'all',
    status: 'all',
    searchQuery: '',
  },

  addTodo: (todoData) => {
    set((state) => {
      const newTodo: Todo = {
        ...todoData,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      const newTodos = [newTodo, ...state.todos];
      saveTodos(newTodos);
      return { todos: newTodos };
    });
  },

  deleteTodo: (id) => {
    set((state) => {
      const newTodos = state.todos.filter((t) => t.id !== id);
      saveTodos(newTodos);
      return { todos: newTodos };
    });
  },

  updateTodo: (id, updatedTodo) => {
    set((state) => {
      const newTodos = state.todos.map((t) => 
        t.id === id ? { ...t, ...updatedTodo } : t
      );
      saveTodos(newTodos);
      return { todos: newTodos };
    });
  },

  toggleComplete: (id) => {
    set((state) => {
      const newTodos = state.todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      saveTodos(newTodos);
      return { todos: newTodos };
    });
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value }
    }));
  },

  setSearchQuery: (query) => {
    set((state) => ({
      filters: { ...state.filters, searchQuery: query }
    }));
  },

  getFilteredTodos: () => {
    const { todos, filters } = get();
    
    return todos.filter((todo) => {
      // 1. Status Filter
      if (filters.status === 'completed' && !todo.completed) return false;
      if (filters.status === 'active' && todo.completed) return false;
      
      // 2. Category Filter
      if (filters.category !== 'all' && todo.category !== filters.category) return false;
      
      // 3. Priority Filter
      if (filters.priority !== 'all' && todo.priority !== filters.priority) return false;
      
      // 4. Search Query Filter (Match title or description)
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchTitle = todo.title.toLowerCase().includes(query);
        const matchDesc = todo.description.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc) return false;
      }

      return true;
    });
  },
}));
