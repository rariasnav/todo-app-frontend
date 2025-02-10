import styled from "styled-components";


export const TaskItemContainer = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #2c3e50;
    border-radius: 5px;
`;

export const Input = styled.input`
    margin-right: 0.5rem;
    padding: 0.5rem;
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

    & + & {
        margin-left: 0.5rem;
    }
`;