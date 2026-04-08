import React from 'react';
import { useTodoStore } from '../store/useTodoStore';
import { TodoItem } from './TodoItem';
import { FiInbox } from 'react-icons/fi';

export const TodoList: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);
  const filters = useTodoStore((state) => state.filters);

  const filteredTodos = todos.filter((todo) => {
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
      const matchDesc = todo.description?.toLowerCase().includes(query) || false;
      if (!matchTitle && !matchDesc) return false;
    }

    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 text-gray-400 mb-4">
          <FiInbox className="text-2xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          We couldn't find any tasks matching your current filters. Try adjusting your search or add a new task.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
