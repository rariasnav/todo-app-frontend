'use client';

import React, { useState } from "react";
import styled from "styled-components";


interface TaskFormProps {
    onSubmit: (task: { title: string; description: string }) => void;
}

const FormContainer = styled.div`
    margin-bottom: 1rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #95a5a6;
    border-radius: 5px;
`;

const Button = styled.button`
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

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
    const [newTask, setNewTask] = useState({ title: "", description: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.title.trim()) {
            alert("Title is required");
            return;
        }
        onSubmit(newTask);
        setNewTask({ title: "", description: "" });
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <Input
                    type="text"
                    placeholder="Task Description"
                    value={newTask.description}
                    onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                    }
                />
                <Button type="submit">Add Task</Button>
            </form>
        </FormContainer>
    );
};

export default TaskForm;