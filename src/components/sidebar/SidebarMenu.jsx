// SidebarMenu.js
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const SidebarMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    user && getItem(`Welcome, ${user.name}`, 'sub1', <UserOutlined />),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
  ].filter(Boolean);

  return (
    <Sider className='w-full' collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
  );
};

export default SidebarMenu;
