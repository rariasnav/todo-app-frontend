import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskForm from "../app/components/TaskForm";


describe("TaskForm Component", () => {
    it("should render the form correctly", () => {
        render(<TaskForm onSubmit={jest.fn()} />);
    
        expect(screen.getByPlaceholderText("Task Title")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Task Description")).toBeInTheDocument();
        expect(screen.getByText("Add Task")).toBeInTheDocument();
    });

    it("should show an alert if title is empty on submit", () => {
        const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
        render(<TaskForm onSubmit={jest.fn()} />);
    
        fireEvent.click(screen.getByText("Add Task"));
    
        expect(alertMock).toHaveBeenCalledWith("Title is required");
    
        alertMock.mockRestore();
    });

    it("should call onSubmit with correct data", () => {
        const mockSubmit = jest.fn();
        render(<TaskForm onSubmit={mockSubmit} />);
    
        fireEvent.change(screen.getByPlaceholderText("Task Title"), {
            target: { value: "Test Task" },
        });
        fireEvent.change(screen.getByPlaceholderText("Task Description"), {
            target: { value: "This is a test task" },
        });
        fireEvent.click(screen.getByText("Add Task"));

        expect(mockSubmit).toHaveBeenCalledWith({
            title: "Test Task",
            description: "This is a test task",
        });
    });
});