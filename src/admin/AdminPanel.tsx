import '../admin/css/AdminPanel.css';
import ItemList from "./ItemList.tsx";
import UserList from "./UserList.tsx";
import {SetStateAction, useEffect, useState} from "react";
import {FaCircleUser} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import OrderList from "./OrderList.tsx";
import AdminDashboard from "./AdminDashboard.tsx";

function AdminPanel() {

    const navigate = useNavigate();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [activeList, setActiveList] = useState('dashboard');

    const handleListChange = (listType: SetStateAction<string>) => {
        setActiveList(listType);
    };

    const handleDropdownClick = (e: React.MouseEvent) => {
        console.log('Dropdown clicked');
        e.stopPropagation(); // Stop the event from propagating
        setIsDropdownVisible(!isDropdownVisible);
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    useEffect(() => {
        const closeDropdown = () => {
            setIsDropdownVisible(false);
        };

        document.addEventListener('click', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);


    return (
        <>
            <header>
                <div className="logo">
                    <h1>
                        <div id="shopName"><a onClick={() => {
                            navigate("/") }}> <b>FurrEverr</b>Finds</a></div>
                    </h1>
                </div>
                <nav className="navigation flex">
                    <a href="#" onClick={() => handleListChange('dashboard')}>Dashboard</a>
                    <a href="#" onClick={() => handleListChange('items')}>Items</a>
                    <a href="#" onClick={() => handleListChange('users')}>Users</a>
                    <a href="#" onClick={() => handleListChange('orders')}>Orders</a>

                    <button onClick={() => navigate('/admin/itemform')}>Upload</button>
                </nav>
                <div className="user-icon" onClick={handleDropdownClick}>
                <FaCircleUser size="3rem" color="#464444" cursor="pointer"/>
                {isDropdownVisible && (
                    <ul className="admin-dropdown">
                        <li onClick={logout}><a href="">Log Out</a></li>
                    </ul>
                )}
                </div>
            </header>

            <main>
                <div className="admin-container">
                    {activeList === 'dashboard' && <AdminDashboard />}
                    {activeList === 'items' && <ItemList />}
                    {activeList === 'users' && <UserList />}
                    {activeList === 'orders' && <OrderList />}
                </div>
            </main>
        </>
    );
}
export default AdminPanel