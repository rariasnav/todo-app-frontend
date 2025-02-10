'use client';

import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import { RootState } from "../../store";
import { 
    Nav, 
    AuthLinksContainer, 
    NavLink, 
    LogoutButton, 
    TitleLink 
} from "./style";


const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Nav>
            <Link href="/" passHref>
                <TitleLink>
                    <h1>Task Manager</h1>
                </TitleLink>
            </Link>
            <AuthLinksContainer>
                {isAuthenticated ? (
                        <LogoutButton as="button" onClick={handleLogout}>Logout</LogoutButton>
                    ) : (
                        <>
                            <NavLink href="/auth/signup">Sign Up</NavLink>
                            <NavLink href="/auth/login">Login</NavLink>
                        </>
                    )}
            </AuthLinksContainer>
        </Nav>
    );
};

export default Navbar;