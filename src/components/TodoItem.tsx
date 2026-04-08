import React from 'react';
import type { Todo } from '../types/todo';
import { useTodoStore } from '../store/useTodoStore';
import { FiTrash2, FiCalendar, FiTag, FiFlag } from 'react-icons/fi';
import { format, isPast, isToday, isValid } from 'date-fns';
import clsx from 'clsx';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleComplete, deleteTodo } = useTodoStore();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const dateObj = new Date(todo.dueDate);
  const validDate = isValid(dateObj);
  const isOverdue = validDate && !todo.completed && isPast(dateObj) && !isToday(dateObj);

  return (
    <div className={clsx(
      "bg-white p-5 rounded-xl border transition-all duration-200 group flex gap-4",
      todo.completed ? "border-gray-200 bg-gray-50/50" : "border-gray-200 hover:border-blue-300 hover:shadow-md",
      isOverdue && !todo.completed && "border-red-200 bg-red-50/30"
    )}>
      {/* Checkbox */}
      <div className="pt-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="w-5 h-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h4 className={clsx(
            "text-lg font-semibold",
            todo.completed ? "text-gray-400 line-through" : "text-gray-800"
          )}>
            {todo.title}
          </h4>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
            title="Delete task"
          >
            <FiTrash2 />
          </button>
        </div>
        
        {todo.description && (
          <p className={clsx(
            "text-sm mb-4 line-clamp-2",
            todo.completed ? "text-gray-400" : "text-gray-600"
          )}>
            {todo.description}
          </p>
        )}

        {/* Tags Row */}
        <div className="flex flex-wrap gap-2 items-center mt-3">
          <span className={clsx(
            "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border",
            getPriorityColor(todo.priority)
          )}>
            <FiFlag />
            {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border border-blue-200 bg-blue-50 text-blue-700">
            <FiTag />
            {todo.category}
          </span>

          <span className={clsx(
            "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border",
            isOverdue ? "border-red-200 bg-red-50 text-red-700" : "border-gray-200 bg-gray-50 text-gray-600"
          )}>
            <FiCalendar />
            {validDate ? format(dateObj, 'MMM dd, yyyy') : 'No Date'}
          </span>
        </div>
      </div>
    </div>
  );
};
