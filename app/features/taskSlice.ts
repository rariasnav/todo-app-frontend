import { createSlice } from "@reduxjs/toolkit";
import { 
    fetchTasks,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompleted 
} from "./taskActions";

interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
}

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.loading = false;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
                state.loading = false;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(editTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task._id !== action.payload);
            })
            .addCase(toggleTaskCompleted.fulfilled, (state, action) => {
                const updatedTask = action.payload;
                const index = state.tasks.findIndex(task => task._id === updatedTask._id);
                if (index !== -1) {
                    state.tasks[index] = { ...state.tasks[index], completed: updatedTask.completed };
                }
            })
    },
});

export default taskSlice.reducer;