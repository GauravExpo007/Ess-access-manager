import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd'; // Using Ant Design for messages
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://192.168.29.225:4009/api/user/forgot-password', {
        email,
      });

      if (response.data.success) {
        message.success('Password reset link sent to your email!');
        navigate('/login'); // Redirect to login page after success
      } else {
        message.error(response.data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error sending reset password request:', error);
      message.error(error.response?.data?.message || 'An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-6">Forgot Password</h1>
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="border p-2 rounded"
          required
        />
        <button 
          type="submit" 
          className="bg-red-500 text-white p-2 rounded" 
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
