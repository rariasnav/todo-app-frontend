'user client';

import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav>
        <a href="/api/auth/login">Login</a>
        <a href="/api/auth/logout">Logout</a>
        </nav>
    );
};

export default Navbar;