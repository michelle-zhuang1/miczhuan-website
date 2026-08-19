import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="navbar-container">
            <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
                Michelle Zhuang
            </Link>
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <Link to="/" className="nav-links" onClick={() => setMenuOpen(false)}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="nav-links" onClick={() => setMenuOpen(false)}>
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/projects" className="nav-links" onClick={() => setMenuOpen(false)}>
                        Projects
                    </Link>
                </li>
                <li>
                    <Link to="/contact" className="nav-links" onClick={() => setMenuOpen(false)}>
                        Contact
                    </Link>
                </li>
            </ul>
        </div>

    )
}
export default NavBar;
