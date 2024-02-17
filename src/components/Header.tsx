import './css/Header.css';
import {FaCircleUser, FaUserPlus} from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {GoChecklist} from "react-icons/go";
import React, {useEffect, useState} from "react";

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
}

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserData | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [logout, setLogout] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            const userData: UserData = JSON.parse(localStorage.getItem('userData') || '{}');
            setUser(userData);
        }
    }, [],);

    const handleLogout = () => {
        localStorage.clear();
        setLogout(true);
    };
    if (logout) {
        navigate('/');
        return null;
    }

    const handleDropdownClick = () => {
        setDropdownOpen(true);
        setTimeout(() => {
            setDropdownOpen(false);
        }, 10000);
    };

    return (
        <>
            <header>
                <section>
                    {/*MAIN CONTAINER*/}
                    <div id="header-container" className="container2 sticky">
                        <div id="shopName"><a onClick={() => { navigate("/") }}> <b>FurrEverr</b>Finds</a></div>

                        <div id="collection">
                            <div id="Category"><a>PET CATEGORY<i><IoIosArrowDown /></i></a>
                                <ul className="dropdown">
                                    <li><a onClick={() => { navigate("/category_dogs") }}>Dog Section</a></li>
                                    <li><a onClick={() => { navigate("/category_cats") }}>Cat Section</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* SEARCH SECTION */}
                        <div id="search">
                            <i className="icon search"><IoSearchSharp size="2rem"/></i>
                            <input type="text" id="input" name="searchBox" placeholder="Search here..." />
                        </div>

                        {/*USER SECTION (CART AND USER ICON) */}
                        <div id="user">
                            <a onClick={() => { navigate("/purchaseList") }}> <i><GoChecklist size="3rem" /></i> </a>
                            <a onClick={() => {
                                navigate(user ? "/profile" : "/loginSignup");
                            }}>
                                {user ? (
                                    <div className="dropdown-container">
                                        <div onClick={handleDropdownClick} className="dropdown-trigger">
                                            <i><FaCircleUser size={"2.8rem"}/></i>
                                        </div>
                                        {dropdownOpen && (
                                            <ul className="dropdown-menu">
                                                <li><a href="/editProfile">Update Profile</a></li>
                                                <li onClick={handleLogout}><a href="">Log Out</a></li>
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <i><FaUserPlus size="2.7rem"/></i>
                                    </>
                                )} </a>
                        </div>
                    </div>

                </section>
            </header>
        </>
    );
}

export default Header;
