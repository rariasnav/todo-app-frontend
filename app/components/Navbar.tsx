'use client';

import styled from "styled-components";
import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { RootState } from "../store";

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: #2c3e50;
    color: #ecf0f1;
`;

const AuthLinksContainer = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const NavLink = styled.a`
    color: #ecf0f1;
    text-decoration: none;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    margin-left: 1rem;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #34495e; /* Add hover effect */
        text-decoration: underline;
    }
`;

const LogoutButton = styled.a`
    color: #000;
    border: none;
    cursor: pointer;
    margin-left: 1rem;

    &:hover {
        text-decoration: underline;
    }
`;

const TitleLink = styled.a`
    color: #ecf0f1;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

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
                {!isAuthenticated && <NavLink href="/auth/signup">Sign Up</NavLink>}
                {!isAuthenticated && <NavLink href="/auth/login">Login</NavLink>}
                {isAuthenticated && <LogoutButton as="button" onClick={handleLogout}>Logout</LogoutButton>}
            </AuthLinksContainer>
        </Nav>
    );
};

export default Navbar;