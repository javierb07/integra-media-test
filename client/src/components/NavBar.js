import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">Sell</Link>
            </li>
            <li>
                <Link to="/invoices">Invoices</Link>
            </li>
            <li>
                <Link to="/products">Products</Link>
            </li>
            <li>
                <Link to="/clients">Clients</Link>
            </li>
            <li>
                <Link to="/employees">Employees</Link>
            </li>
        </ul>
    </nav>
);

export default NavBar;
