// DashboardHeader.js
import { Layout, Breadcrumb } from 'antd';

const { Header } = Layout;

const DashboardHeader = () => {
  return (
    <Header className='bg-[#F5F5F5]' style={{ padding: 0 }}>
      <Breadcrumb style={{ margin: '16px ' }}>
        <Breadcrumb.Item >User</Breadcrumb.Item>
        <Breadcrumb.Item >Dashboard</Breadcrumb.Item>
      </Breadcrumb>
    </Header>
  );
};

export default DashboardHeader;
