import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const SiteModal = ({ visible, onCancel, onFinish, loading, editingSite }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (editingSite) {
      form.setFieldsValue(editingSite);
    } else {
      form.resetFields();
    }
  }, [editingSite, form]);

  // Wrap onFinish to reset fields after successful submission
  const handleFinish = async (values) => {
    await onFinish(values);  // Call parent component's onFinish
    form.resetFields();       // Clear form fields after successful submission
  };

  return (
    <Modal
      title={editingSite ? "Edit Site" : "Add Site"}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} name="add_site_form" layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Website Name"
          name="title"
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
            <Option value="wordpress">WordPress</Option>
            <Option value="google">Google Account</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {editingSite ? "Update Site" : "Add Site"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

// Add PropTypes for validation
SiteModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  editingSite: PropTypes.object,
};

export default SiteModal;
