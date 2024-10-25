
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Access Manager</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-gray-400">Login</Link>
              <Link to="/signup" className="hover:text-gray-400">Signup</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
