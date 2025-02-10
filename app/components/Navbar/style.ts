import styled from "styled-components";


export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: #2c3e50;
    color: #ecf0f1;
`;

export const AuthLinksContainer = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

export const NavLink = styled.a`
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

export const LogoutButton = styled.a`
    color: #000;
    border: none;
    cursor: pointer;
    margin-left: 1rem;

    &:hover {
        text-decoration: underline;
    }
`;

export const TitleLink = styled.a`
    color: #ecf0f1;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;