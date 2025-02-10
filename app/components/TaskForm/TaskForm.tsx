'use client';

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormContainer, Input, Button } from "./style";
import { useAppSelector } from "../../hooks/useAppSelector";
import { RootState } from "../../store";


interface TaskFormProps {
    onSubmit: (task: { title: string; description: string }) => void;
    taskToEdit?: { title: string; description: string };
}

interface TaskData {
    title: string;
    description: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, taskToEdit }) => {
    const loading = useAppSelector((state: RootState) => state.tasks.loading);
    const { register, handleSubmit, setValue } = useForm<TaskData>();

    useEffect(() => {
        if (taskToEdit) {
            setValue("title", taskToEdit.title);
            setValue("description", taskToEdit.description);
        }
    }, [taskToEdit, setValue]);

    const onSubmitForm: SubmitHandler<TaskData> = (data) => {
        onSubmit(data);
        setValue("title", "");
        setValue("description", "");
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <Input
                    type="text"
                    placeholder="Task Title"
                    {...register("title", { required: true })}
                />
                <Input
                    type="text"
                    placeholder="Task Description"
                    {...register("description")}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? "Adding..." : taskToEdit ? "Update Task" : "Add Task"}
                </Button>
            </form>
        </FormContainer>
    );
};

export default TaskForm;