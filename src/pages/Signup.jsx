import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux'; // Import dispatch from Redux
import axios from 'axios';
// import { loginSuccess } from '../features/authSlice'; // Import action from authSlice

const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const dispatch = useDispatch(); // Get Redux dispatch

  const handleSignup = async (values) => {
    const { name, email, password } = values;

    try {
      const response = await axios.post('http://192.168.29.225:4009/api/v1/user/register', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        message.success('Signup successful! Redirecting to Login Page...');

        // Dispatch loginSuccess to store user info in Redux
        //dispatch(loginSuccess(response.data));

        // Redirect to dashboard or another page after signup
        navigate('/login');
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      message.error(error.response?.data?.message || 'User Already Exists');
    }
  };

  const validateConfirmPassword = (_, value) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject(new Error('Passwords do not match!'));
    }
    return Promise.resolve();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl mb-6">Signup</h1>
      <Form
        form={form}
        name="signup_form"
        layout="vertical"
        onFinish={handleSignup}
        className="w-full max-w-md p-6 bg-white shadow-md rounded"
      >
        {/* Name Field */}
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
            {
              min: 3,
              message: 'Name must be at least 3 characters!',
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Please enter a valid email!',
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 6,
              message: 'Password must be at least 6 characters!',
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        {/* Confirm Password Field */}
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            {
              validator: validateConfirmPassword,
            },
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        {/* Signup Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Signup
          </Button>
        </Form.Item>
      </Form>

      {/* Link to Login Page */}
      <Link to="/login" className="mt-4 text-blue-500">
        Already have an account? Login
      </Link>
    </div>
  );
};

export default Signup;
