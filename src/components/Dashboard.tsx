import React from 'react';
import { useTodoStore } from '../store/useTodoStore';
import { FiCheckCircle, FiClock, FiList } from 'react-icons/fi';

export const Dashboard: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);

  const totalTodos = todos.length;
  const completedTodos = todos.filter(t => t.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionRate = totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Total Tasks */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
        <div className="p-4 bg-blue-50 text-blue-600 rounded-xl mr-4">
          <FiList className="text-2xl" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Tasks</p>
          <h3 className="text-2xl font-bold text-gray-800">{totalTodos}</h3>
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
        <div className="p-4 bg-green-50 text-green-600 rounded-xl mr-4">
          <FiCheckCircle className="text-2xl" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Completed</p>
          <h3 className="text-2xl font-bold text-gray-800">{completedTodos}</h3>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
        <div className="p-4 bg-amber-50 text-amber-600 rounded-xl mr-4">
          <FiClock className="text-2xl" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Pending</p>
          <h3 className="text-2xl font-bold text-gray-800">{pendingTodos}</h3>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
        <div className="flex justify-between items-end mb-2">
          <p className="text-sm font-medium text-gray-500">Completion Rate</p>
          <h3 className="text-2xl font-bold text-gray-800">{completionRate}%</h3>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
