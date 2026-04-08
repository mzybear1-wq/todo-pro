import React from 'react';
import { useTodoStore } from '../store/useTodoStore';
import { FiSearch } from 'react-icons/fi';
import type { Priority } from '../types/todo';

export const FilterBar: React.FC = () => {
  const { filters, setFilter, setSearchQuery } = useTodoStore();

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col xl:flex-row gap-4 items-center justify-between mb-6">
      
      {/* Search Input */}
      <div className="relative w-full xl:w-1/3">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full xl:w-auto">
        <select
          value={filters.status}
          onChange={(e) => setFilter('status', e.target.value)}
          className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm flex-1 bg-white cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilter('priority', e.target.value as Priority | 'all')}
          className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm flex-1 bg-white cursor-pointer"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value)}
          className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm flex-1 bg-white cursor-pointer"
        >
          <option value="all">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Learning">Learning</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

    </div>
  );
};
