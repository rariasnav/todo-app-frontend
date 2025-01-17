import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskItem from "../app/components/TaskItem";

describe("TaskItem Component", () => {
    const mockTask = {
        _id: "1",
        title: "Test Task",
        description: "This is a test task",
        completed: false,
    };

    const mockHandlers = {
        onEdit: jest.fn(),
        onSaveEdit: jest.fn(),
        onDelete: jest.fn(),
        onToggle: jest.fn(),
    };

    it("should render the task correctly", () => {
        render(<TaskItem task={mockTask} {...mockHandlers} />);

        expect(screen.getByText("Test Task")).toBeInTheDocument();
        expect(screen.getByText("This is a test task")).toBeInTheDocument();
        expect(screen.getByText("Mark Complete")).toBeInTheDocument();
        expect(screen.getByText("Edit")).toBeInTheDocument();
        expect(screen.getByText("Delete")).toBeInTheDocument();
    });

    it("should call onToggle when toggle button is clicked", () => {
        render(<TaskItem task={mockTask} {...mockHandlers} />);

        fireEvent.click(screen.getByText("Mark Complete"));

        expect(mockHandlers.onToggle).toHaveBeenCalledWith("1", false);
    });

    it("should call onDelete when delete button is clicked", () => {
        render(<TaskItem task={mockTask} {...mockHandlers} />);

        fireEvent.click(screen.getByText("Delete"));

        expect(mockHandlers.onDelete).toHaveBeenCalledWith("1");
    });

    it("should enter edit mode when edit button is clicked", () => {
        render(<TaskItem task={mockTask} {...mockHandlers} />);

        fireEvent.click(screen.getByText("Edit"));

        expect(screen.getByPlaceholderText("Edit Title")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Edit Description")).toBeInTheDocument();
    });

    it("should call onSaveEdit with updated task data", () => {
        render(<TaskItem task={mockTask} {...mockHandlers} />);

        fireEvent.click(screen.getByText("Edit"));

        fireEvent.change(screen.getByPlaceholderText("Edit Title"), {
        target: { value: "Updated Task" },
        });
        fireEvent.change(screen.getByPlaceholderText("Edit Description"), {
        target: { value: "Updated description" },
        });
        fireEvent.click(screen.getByText("Save"));

        expect(mockHandlers.onSaveEdit).toHaveBeenCalledWith("1", {
            title: "Updated Task",
            description: "Updated description",
        });
    });
});