// SiteTable.jsx
import PropTypes from 'prop-types'; // Import PropTypes
import { Table, Button, Popconfirm } from 'antd';

const SiteTable = ({ siteData, onEdit, onDelete }) => {
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
          <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this site?"
            onConfirm={() => onDelete(record._id)}
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
    <Table
      dataSource={siteData}
      columns={columns}
      rowKey="_id" // Adjust rowKey as per your unique identifier
      pagination={true}
    />
  );
};

// Add PropTypes for validation
SiteTable.propTypes = {
  siteData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SiteTable;
