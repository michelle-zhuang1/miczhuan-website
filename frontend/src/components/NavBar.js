import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() { 
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="navbar-container">
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'} />
                <span></span>
                <span></span>
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