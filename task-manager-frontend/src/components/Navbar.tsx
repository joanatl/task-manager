import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <Link to="/dashboard" className="text-xl font-bold hover:text-gray-200">
            TaskManager
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            Sobre
          </Link>
        </div>

        {token && (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
          >
            Sair
          </button>
        )}
      </div>
    </nav>
  );
};
