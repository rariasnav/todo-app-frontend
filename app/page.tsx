'use client';

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import axiosInstance from "./utils/axiosInstance";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";


const Container = styled.div`
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #34495e;
    color: #ecf0f1;
    border-radius: 10px;
`;

export default function HomePage() {
    const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
    const [tasks, setTasks] = useState<any[]>([]);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editedTask, setEditedTask] = useState({ title: "", description: "" });

    useEffect(() => {
        if (isAuthenticated && token) {
            fetchTasks();
        }
    }, [isAuthenticated, token]);

    const fetchTasks = async () => {
        try {
            const response = await axiosInstance.get("/api/todos", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleAddTask = async (task: { title: string; description: string }) => {
        try {
            const response = await axiosInstance.post("/api/todos", task, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks((prevTasks) => [...prevTasks, response.data]);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleEditTask = async (
        id: string,
        updatedTask: { title: string; description: string }
    ) => {
            if (!updatedTask.title.trim()) {
            alert("Title is required");
            return;
            }

        try {
            const response = await axiosInstance.put(`/api/todos/${id}`, updatedTask, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });

            setTasks((prevTasks) =>
                prevTasks.map((task) => (task._id === id ? response.data : task))
            );
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Failed to update the task. Please try again.");
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            await axiosInstance.delete(`/api/todos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const toggleTaskCompleted = async (id: string, completed: boolean) => {
        try {
            const response = await axiosInstance.put(
                `/api/todos/${id}`,
                { completed: !completed },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task._id === id ? response.data : task))
            );
        } catch (error) {
            console.error("Error toggling task completed status:", error);
        }
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
                    onToggle={toggleTaskCompleted}
                />
                ))}
            </ul>
        </Container>
    );
}