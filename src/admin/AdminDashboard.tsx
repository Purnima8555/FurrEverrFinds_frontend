import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../admin/css/AdminPanel.css'
import {BsCartCheck} from "react-icons/bs";
import {FaBoxArchive} from "react-icons/fa6";
import {FaUsers} from "react-icons/fa";

const AdminDashboard: React.FC = () => {
    const [salesCount, setSalesCount] = useState<number>(0);
    const [productCount, setProductCount] = useState<number>(0);
    const [userCount, setUserCount] = useState<number>(0);

    useEffect(() => {
        fetchSalesCount();
        fetchProductCount();
        fetchUserCount();

    }, []);

    const fetchSalesCount = async () => {
        try {
            const response = await axios.get<number>('http://localhost:8080/order/sales');
            setSalesCount(response.data);
        } catch (error) {
            console.error('Error fetching sales count:', error);
        }
    };

    const fetchProductCount = async () => {
        try {
            const response = await axios.get<number>('http://localhost:8080/content/count');
            setProductCount(response.data);
        } catch (error) {
            console.error('Error fetching product count:', error);
        }
    };

    const fetchUserCount = async () => {
        try {
            const response = await axios.get<number>('http://localhost:8080/users/count');
            setUserCount(response.data);
        } catch (error) {
            console.error('Error fetching user count:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-headerimg">
                <div className="admin-img">
                    <img src="admin.png" alt="img"/>
                </div>
                <div className="admin-title">
                    <h2>Welcome, Admin</h2>
                    <p>Where Passion meets Precise Management!</p>
                </div>
            </div>
            <div className="dash-container">
                <div className="sales-count">
                    <div className="admin-icon">
                        <span><BsCartCheck /></span>
                    </div>
                    <div className="dash-titles">
                        <h4>Sales:</h4>
                        <p>{salesCount}</p>
                    </div>
                </div>
                <div className="product-count">
                    <div className="admin-icon">
                        <span><FaBoxArchive /></span>
                    </div>
                    <div className="dash-titles">
                        <h4>Products:</h4>
                        <p>{productCount}</p>
                    </div>
                </div>
                <div className="user-count">
                    <div className="admin-icon">
                        <span><FaUsers /></span>
                    </div>
                    <div className="dash-titles">
                        <h4>Users:</h4>
                        <p>{userCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
