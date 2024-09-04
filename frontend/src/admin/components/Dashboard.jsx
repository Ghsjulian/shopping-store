import React from "react";
import "../styles/admin-layout.css";
const Dashboard = () => {
    return (
        <section className="page">
            <h2 className="heading">Admin Dashboard</h2>
            <div className="grid admin-row" id="products">
                <div className="col admin-col">
                    <i className="bx bx-bar-chart"></i>
                    <h3>236 People</h3>
                    <h3>Customer Rank</h3>
                </div>
                <div className="col admin-col">
                    <i className="bx bx-history"></i>
                    <h3>80% Growth</h3>
                    <h3>Business Grow</h3>
                </div>
                <div className="col admin-col">
                    <i className="bx bx-shopping-bag"></i>
                    <h3>23 Orders</h3>
                    <h3>Total Orders</h3>
                </div>
                <div className="col admin-col">
                    <i className="bx bx-group"></i>
                    <h3>323 Customer</h3>
                    <h3>Total Customer</h3>
                </div>
                <div className="col admin-col">
                    <i className="bx bx-purchase-tag"></i>
                    <h3>Bookmark</h3>
                    <h3>View Bookmark</h3>
                </div>
                <div className="col admin-col">
                    <i className="bx bx-message-alt-add"></i>
                    <h3>37 Products</h3>
                    <h3>Added Product</h3>
                </div>
                <div className="col admin-col">
                    <i className="bx bx-dollar"></i>
                    <h3>370 Dollar</h3>
                    <h3>Total Earnings</h3>
                </div>
                <div className="col admin-col">
                    <i className="bx bx-shopping-bag"></i>
                    <h3>23 Orders</h3>
                    <h3>Total Orders</h3>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
