'use client';

import React, { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { TaskItemContainer, Input, Button } from "./style";
import styled from "styled-components";


const TaskText = styled.p<{ completed: boolean }>`
    text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
    color: ${({ completed }) => (completed ? "green" : "red")}; // Cambia el color según el estado
`;

interface TaskItemProps {
    task: { _id: string; title: string; description: string; completed: boolean };
    onEdit: (id: string) => void;
    onSaveEdit: (id: string, updatedTask: { title: string; description: string }) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onSaveEdit, onDelete, onToggle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, setValue } = useForm();

    const handleEdit = () => {
        setValue("title", task.title);
        setValue("description", task.description);
        setIsEditing(true);
    };

    const onSubmitEdit: SubmitHandler<FieldValues> = (data) => {
        onSaveEdit(task._id, {
            title: data.title,
            description: data.description,
        });
        setIsEditing(false);
    };

    return (
        <TaskItemContainer>
            {isEditing ? (
            <form onSubmit={handleSubmit(onSubmitEdit)}>
                <Input
                    type="text"
                    placeholder="Edit Title"
                    {...register("title")}
                />
                <Input
                    type="text"
                    placeholder="Edit Description"
                    {...register("description")}
                />
                <Button type="submit">Save</Button>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            </form>
            ) : (
            <>
                <div style={{ flex: 1 }}>
                    <TaskText completed={task.completed}>{task.title}</TaskText>
                    <p>{task.description}</p>
                </div>
                <Button onClick={() => onToggle(task._id)}>
                    {task.completed ? "Mark Incomplete" : "Mark Complete"}
                </Button>
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={() => onDelete(task._id)}>Delete</Button>
            </>
            )}
        </TaskItemContainer>
    );
};

export default TaskItem;