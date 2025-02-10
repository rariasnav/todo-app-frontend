import styled from "styled-components";


export const FormContainer = styled.div`
    margin-bottom: 1rem;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #95a5a6;
    border-radius: 5px;
`;

export const Button = styled.button`
    background-color: #e74c3c;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #c0392b;
    }
`;