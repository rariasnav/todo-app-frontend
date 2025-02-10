import styled from "styled-components";


export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #34495e;
    color: #ecf0f1;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    background-color: #2c3e50;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
`;

export const Title = styled.h1`
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #ecf0f1;
`;

export const Label = styled.label`
    margin-bottom: 0.5rem;
    font-weight: bold;
`;

export const Input = styled.input`
    padding: 0.8rem;
    margin-bottom: 1.5rem;
    border: 1px solid #95a5a6;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 5px #3498db;
    }
`;

export const Button = styled.button`
    background-color: #e74c3c;
    color: #fff;
    padding: 0.8rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #c0392b;
    }

    &:focus {
        outline: none;
    }

    &:disabled {
        background-color: #95a5a6;
        cursor: not-allowed;
    }
`;