'use client';

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "./hooks/useAppSelector";
import { useAppDispatch } from "./hooks/useAuthDispatch";
import { RootState } from "./store";
import { 
    fetchTasks,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompleted
} from "./features/taskActions";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskItem from "./components/TaskItem/TaskItem";


const Container = styled.div`
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #34495e;
    color: #ecf0f1;
    border-radius: 10px;
`;

export default function HomePage() {
    const dispatch = useAppDispatch();
    const { isAuthenticated, token } = useAppSelector((state: RootState) => state.auth);
    const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editedTask, setEditedTask] = useState({ title: "", description: "" });

    useEffect(() => {
        if (isAuthenticated && token) {
            dispatch(fetchTasks());
        }
    }, [isAuthenticated, token, dispatch]);

    const handleAddTask = async (task: { title: string; description: string }) => {
        await dispatch(addTask(task));
    };

    const handleEditTask = async (_id: string, updatedTask: { title: string; description: string }) => {
        await dispatch(editTask({_id, updatedTask}));
    };

    const handleDeleteTask = async (_id: string) => {
        await dispatch(deleteTask(_id));
    };

    const handleToggleTaskCompleted = async (_id: string) => {
        await dispatch(toggleTaskCompleted({ _id }));
    };

    if (!isAuthenticated) {
        return(
            <Container>Please log in to view your tasks.</Container>
        );
    }

    return (
        <Container>
            <h1>Task List</h1>
            <TaskForm onSubmit={handleAddTask} />
            <ul>
                {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onEdit={(id) => {
                        setEditingTaskId(id);
                        setEditedTask({ title: task.title, description: task.description });
                    }}
                    onSaveEdit={(id, updatedTask) => handleEditTask(id, updatedTask)}
                    onDelete={handleDeleteTask}
                    onToggle={handleToggleTaskCompleted}
                />
                ))}
            </ul>
        </Container>
    );
}