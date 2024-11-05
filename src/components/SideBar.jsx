// SideBar.js
import { useState, useEffect } from 'react';
import { Layout, message, Button } from 'antd';
import axios from 'axios';
import SidebarMenu from './sidebar/SidebarMenu';
import DashboardHeader from './sidebar/DashboardHeader';
import SiteTable from './sidebar/SiteTable';
import SiteModal from './sidebar/SiteModal';

const { Content, Footer } = Layout;

const SideBar = () => {
  const [siteData, setSiteData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSites();
  }, []);

  const handleOpenModal = (site = null) => {
    setEditingSite(site);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSite(null);
    setLoading(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (editingSite) {
        await axios.patch(`api/v1/sites/${editingSite._id}`, values, { withCredentials: true });
        message.success('Site updated successfully!');
      } else {
        await axios.post(`api/v1/sites`, values, { withCredentials: true });
        message.success('Site added successfully!');
      }


      handleCloseModal();
      loadSites();
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error(`Failed to ${editingSite ? 'update' : 'add'} site. Please try again.`);
    } finally {
      setLoading(false);
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidebarMenu />
      <Layout>
        <DashboardHeader />
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            <Button type="primary" onClick={() => handleOpenModal(null)}>Add Site</Button>
            <SiteTable siteData={siteData} onEdit={handleOpenModal} onDelete={handleDelete} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
      <SiteModal
        visible={isModalOpen}
        onCancel={handleCloseModal}
        onFinish={onFinish}
        loading={loading}
        editingSite={editingSite}
      />
    </Layout>
  );
};

export default SideBar;
