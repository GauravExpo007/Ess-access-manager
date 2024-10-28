import { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Select, message, Layout, Menu, Breadcrumb, Table, theme, Popconfirm } from 'antd';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [siteData, setSiteData] = useState([]);
  const [editingSite, setEditingSite] = useState(null); // State for editing

  useEffect(() => {
    loadSites();
  }, []);

  const handleOpenModal = (site) => {
    if (site) {
      form.setFieldsValue(site); // Pre-fill form with site data for editing
      setEditingSite(site); // Set the site to be edited
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    form.resetFields();
    setIsModalOpen(false);
    setEditingSite(null); // Reset editing state
  };

  const onFinish = async (values) => {
    try {
      if (editingSite) {
        // Update site
        await axios.patch(`api/v1/sites/${editingSite._id}`, values, { withCredentials: true });
        message.success('Site updated successfully!');
      } else {
        // Add new site
        await axios.post(`api/v1/sites`, values, { withCredentials: true });
        message.success('Site added successfully!');
      }
      handleCloseModal();
      loadSites();
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error(`Failed to ${editingSite ? 'update' : 'add'} site. Please try again.`);
    }
  };

  const loadSites = async () => {
    try {
      const response = await axios.get(`api/v1/sites`, { withCredentials: true });
      setSiteData(response.data.message);
    } catch (error) {
      console.error('Error loading sites:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`api/v1/sites/${id}`, { withCredentials: true });
      message.success('Site deleted successfully!');
      loadSites();
    } catch (error) {
      console.error('Error deleting site:', error);
      message.error('Failed to delete site. Please try again.');
    }
  };

  const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    user && getItem(`Welcome, ${user.name}`, 'sub1', <UserOutlined />),
    getItem('Team', 'sub2', <TeamOutlined />, [
      getItem('Team 1', '6'),
      getItem('Team 2', '8'),
    ]),
    getItem('Files', '9', <FileOutlined />),
  ].filter(Boolean);

  // Define columns for the data table, including Edit and Delete buttons
  const columns = [
    { title: 'Website Name', dataIndex: 'title', key: 'title' },
    { title: 'Login URL', dataIndex: 'loginUrl', key: 'loginUrl' },
    { title: 'Redirect URL', dataIndex: 'redirectUrl', key: 'redirectUrl' },
    { title: 'Website Type', dataIndex: 'websiteType', key: 'websiteType' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button type="link" onClick={() => handleOpenModal(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this site?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <h1 className="text-3xl">Dashboard</h1>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="flex flex-col gap-14"
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="flex justify-between">
              {user ? `${user.name} is logged in.` : 'Welcome, guest!'}
              <Button type="primary" onClick={() => handleOpenModal(null)}>
                Add Site
              </Button>
            </div>
            <div>
              <h2>Site Data Table</h2>
              <Table
                dataSource={siteData}
                columns={columns}
                rowKey="_id" // Adjust rowKey as per your unique identifier
                pagination={false}
              />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>

      {/* Add/Edit Site Modal */}
      <Modal
        title={editingSite ? "Edit Site" : "Add Site"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form form={form} name="add_site_form" layout="vertical" onFinish={onFinish}>
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
            <Button type="primary" htmlType="submit" block>
              {editingSite ? "Update Site" : "Add Site"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default SideBar;
