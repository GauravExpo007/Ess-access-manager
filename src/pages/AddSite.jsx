// src/components/AddSite.js

import { Button, Form, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const AddSite = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log('Form values:', values);

    try {
      // Sending POST request to the mock API
      const response = await axios.post('http://localhost:4000/sites', values);
      
      if (response.status === 201) {
        message.success('Site added successfully!');
        navigate('/dashboard'); // Redirect back to dashboard after successful addition
      }
    } catch (error) {
      console.error('Error adding site:', error);
      message.error('Failed to add site. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-3xl mb-6">Add Site</h1>
      <Form
        form={form}
        name="add_site_form"
        layout="vertical"
        onFinish={onFinish}
        className="w-full max-w-md p-6 bg-white shadow-md rounded"
      >
        <Form.Item
          label="Website Name"
          name="websiteName"
          rules={[{ required: true, message: 'Please input your website name!' }]}
        >
          <Input placeholder="Website Name" />
        </Form.Item>

        <Form.Item
          label="Login URL"
          name="loginUrl"
          rules={[{ required: true, message: 'Please input the login URL!' }]}
        >
          <Input placeholder="Login URL" />
        </Form.Item>

        <Form.Item
          label="Redirect URL"
          name="redirectUrl"
          rules={[{ required: true, message: 'Please input the redirect URL!' }]}
        >
          <Input placeholder="Redirect URL" />
        </Form.Item>

        <Form.Item
          label="Website Type"
          name="websiteType"
          rules={[{ required: true, message: 'Please select the website type!' }]}
        >
          <Select placeholder="Select Website Type">
            <Option value="blog">Blog</Option>
            <Option value="ecommerce">E-commerce</Option>
            <Option value="portfolio">Portfolio</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Site
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSite;
