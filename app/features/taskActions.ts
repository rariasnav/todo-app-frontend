import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";


export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { getState, rejectWithValue }) => {
    try {
        const state: any = getState();
        const response = await axiosInstance.get("/api/todos", {
            headers: { Authorization: `Bearer ${state.auth.token}` },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch tasks");
    }
});

export const addTask = createAsyncThunk("tasks/addTask", 
    async (task: { title: string; description: string }, { getState, rejectWithValue }) => {
    try {
        const state: any = getState();
        const response = await axiosInstance.post("/api/todos", task, {
            headers: { Authorization: `Bearer ${state.auth.token}` },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to add task");
    }
});

export const editTask = createAsyncThunk("tasks/editTask",
    async ({ _id, updatedTask }: { _id: string; updatedTask: { title: string, description: string } },
        { getState, rejectWithValue }) => {
            try {
                const state: any = getState();
                const response = await axiosInstance.put(`/api/todos/${_id}`, updatedTask, {
                    headers: { Authorization: `Bearer ${state.auth.token}` },
                })
                return response.data;
            } catch (error: any) {
                return rejectWithValue(error.response?.data?.message || "Failed to edit task");
            }
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", 
    async (_id: string, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();
            await axiosInstance.delete(`/api/todos/${_id}`, {
                headers: { Authorization: `Bearer ${state.auth.token}` },
            });
            return _id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete task");
        }
});

export const toggleTaskCompleted = createAsyncThunk(
    "tasks/toggleTaskCompleted", 
    async ({ _id }: { _id: string }, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();
            const taskToToggle = state.tasks.tasks.find((task: any) => task._id === _id)

            if (!taskToToggle) {
                return rejectWithValue("Task not found in store");
            }

            const response = await axiosInstance.patch(
                `/api/todos/${_id}/completed`,
                { completed: !taskToToggle.completed },
                {
                    headers: { Authorization: `Bearer ${state.auth.token}` },
                }
            );
            
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to toggle task completed status");
        }        
});