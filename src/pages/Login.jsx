import { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../features/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Change to '/dashboard' if that's your target
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values) => {
    const { email, password } = values; // Use 'email' if that's what you use for signup
    setLoading(true);

    try {
      const response = await axios.post('http://192.168.29.225:4009/api/v1/user/login', {
        email, // Ensure this matches what your backend expects
        password,
      });
      // console.log(response.data);
      // Check the response structure based on your API
      if (response.data.success) {
        dispatch(loginSuccess({ username: response.data.data.user.name })); // Adjust if using email
console.log(response.data);
        message.success(`Welcome, ${response.data.data.user.name}!`);
        navigate('/dashboard'); // Navigate to the desired page
      } else {
        message.error(response.data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error(error.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-3xl mb-6">Login</h1>
      <Form
        form={form}
        name="login_form"
        layout="vertical"
        onFinish={onFinish}
        className="w-full max-w-md p-6 bg-white shadow-md rounded"
      >
        <Form.Item
          name="email" // Update to 'email' if needed
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={
                loading ||
                !form.isFieldsTouched(true) || 
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              {loading ? <Spin /> : 'Log in'}
            </Button>
          )}
        </Form.Item>

        <div className="flex justify-between">
          <Link to="/signup">Signup</Link>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
