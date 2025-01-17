'use client';

import React, { useState } from "react";
import styled from "styled-components";

const TaskItemContainer = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #2c3e50;
    border-radius: 5px;
`;

const Input = styled.input`
    margin-right: 0.5rem;
    padding: 0.5rem;
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

    & + & {
        margin-left: 0.5rem;
    }
`;

interface TaskItemProps {
    task: { _id: string; title: string; description: string; completed: boolean };
    onEdit: (id: string) => void;
    onSaveEdit: (id: string, updatedTask: { title: string; description: string }) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string, completed: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onSaveEdit, onDelete, onToggle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValues, setEditValues] = useState({
        title: task.title,
        description: task.description,
    });

    return (
        <TaskItemContainer>
            {isEditing ? (
            <>
                <Input
                    type="text"
                    value={editValues.title}
                    placeholder="Edit Title"
                    onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
                />
                <Input
                    type="text"
                    value={editValues.description}
                    placeholder="Edit Description"
                    onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                />
                <Button
                    onClick={() => {
                        onSaveEdit(task._id, editValues);
                        setIsEditing(false);
                    }}
                >
                    Save
                </Button>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
            ) : (
            <>
                <div style={{ flex: 1 }}>
                    <p>{task.title}</p>
                    <p>{task.description}</p>
                </div>
                <Button onClick={() => onToggle(task._id, task.completed)}>
                    {task.completed ? "Mark Incomplete" : "Mark Complete"}
                </Button>
                <Button
                    onClick={() => {
                        onEdit(task._id);
                        setIsEditing(true);
                    }}
                >
                    Edit
                </Button>
                <Button onClick={() => onDelete(task._id)}>Delete</Button>
            </>
            )}
        </TaskItemContainer>
    );
};

export default TaskItem;