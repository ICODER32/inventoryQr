import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css'
import axios from 'axios';
import logo from '../../assets/logo192.png'

const Navbar = ({ setLoggedIn }) => {
    const [userRole, setUserRole] = useState('');
    const [image, setImage] = useState('')
    const navigate = useNavigate();
    const user_id = localStorage.getItem('user_id')

    useEffect(() => {
        // Fetch user data and set the user role and profile pic
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/users/${user_id}`);
                setUserRole(response.data.data.user_type)
                setImage(response.data.data.image)
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserData();

    }, [userRole, user_id]);

    const handleLogout = () => {
        // Clear local storage and navigate to the login page
        localStorage.clear();
        setLoggedIn(null)
        navigate('/');
    };


    return (
        <div className="sidebar">
            <div>
                <img src={logo} style={{ position: 'absolute', top: '0px', left: '50px', width: '100px', height: '100px', borderRadius: '50px' }} alt="Profile Pic" className="sidebar-profile-pic" />
            </div>
            <div className="sidebar-profile">
                <Link to="/dashboard">
                    <img src={image} alt="" />
                </Link>
                <p className="sidebar-user-role">{userRole === 'admin' ? 'Employer' : 'Employee'}</p>
            </div>

            <ul className="sidebar-list">
                <li className="sidebar-item">
                    <Link to="/dashboard" className="sidebar-link">Profile</Link>
                </li>
                {userRole === 'admin' && <li className="sidebar-item">
                    <Link to="/employee" className="sidebar-link">Employee List</Link>
                </li>}

                <li className="sidebar-item">
                    <Link to="/scan" className="sidebar-link">Scan Item</Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/itemList" className="sidebar-link">Scanned Items</Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/chat" className="sidebar-link">Chat</Link>
                </li>



            </ul>

            <div className="sidebar-logout">
                <button onClick={handleLogout} className="sidebar-logout-btn">Logout</button>
            </div>
        </div>
    );

};

export default Navbar;
