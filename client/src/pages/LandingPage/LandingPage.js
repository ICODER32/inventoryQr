import React from 'react';
import './styles.css';
import logo from '../../assets/logo192.png'
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="landing-page">
            <header>

                <div className="logo-container">
                    <img src={logo} alt="Inventory Management Logo" />
                    <h1>Inventory Management</h1>
                </div>
            </header>
            <main>
                <h2>Efficiently manage your inventory with ease</h2>
                <p>Keep track of your products, orders, and suppliers in one central location.</p>
                <Link to='/login'><button>Get started</button></Link>
            </main>
            <footer>
                <p>Inventory Management © 2023</p>
            </footer>
        </div>
    );
}

export default LandingPage;
