import React from 'react';

const Dashboard = () => {
  return (
    <div className="card shadow rounded-4 p-4">
      <h3 className="mb-4"><i className={`fas fa-chart-pie text-danger`}></i> Dashboard Overview</h3>
      <div className="row g-4">
        <div className="col-md-3">
          <div className="bg-black text-white p-3 rounded-4 shadow text-center">
            <h5><i className={`fas fa-archive `}></i> Products</h5>
            <p className="fs-4">120</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-black text-white p-3 rounded-4 shadow text-center">
            <h5><i className={`fas fa-shipping-fast`}></i> Orders</h5>
            <p className="fs-4">89</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-black text-white p-3 rounded-4 shadow text-center">
            <h5><i className={`fas fa-user`}></i> Users</h5>
            <p className="fs-4">340</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-black text-white p-3 rounded-4 shadow text-center">
            <h5><i className={`fas fa-clipboard`}></i> Messages</h5>
            <p className="fs-4">24</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-black text-white p-3 rounded-4 shadow text-center">
            <h5><i className={`fas fa-archive `}></i> Products in cart</h5>
            <p className="fs-4">120</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-black text-white p-3 rounded-4 shadow text-center">
            <h5><i className={`fas fa-archive `}></i> Products in wishlist</h5>
            <p className="fs-4">120</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;