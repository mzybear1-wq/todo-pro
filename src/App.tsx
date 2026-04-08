import { Dashboard } from './components/Dashboard';
import { AddTodo } from './components/AddTodo';
import { FilterBar } from './components/FilterBar';
import { TodoList } from './components/TodoList';
import { FiCheckSquare } from 'react-icons/fi';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <header className="mb-10 text-center sm:text-left flex items-center justify-center sm:justify-start gap-3">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/30">
            <FiCheckSquare className="text-3xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">TodoPro</h1>
            <p className="text-gray-500 mt-1">Manage your tasks, boost your productivity.</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Dashboard Stats */}
          <section aria-label="Dashboard Statistics">
            <Dashboard />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column: Actions & Filters */}
            <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8">
              <section aria-label="Add new task">
                <AddTodo />
              </section>
            </div>

            {/* Right Column: Todo List */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Your Tasks</h2>
              </div>
              
              <FilterBar />
              <TodoList />
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} TodoPro. Built with React, Zustand & Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
