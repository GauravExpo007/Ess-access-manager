// src/components/Dashboard.js

// import { Button } from 'antd';
// import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';

const Dashboard = () => {
  // const navigate = useNavigate();

  return (
    <>
      <div>
        <SideBar />
      </div>

      {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <h1 className="text-3xl mb-6">Dashboard</h1>
       

        <Button
          type="primary"
          onClick={() => navigate('/add-site')} // Navigate to the add site page
        >
          Add Site
        </Button>
      </div> */}

    </>

  );
};

export default Dashboard;
