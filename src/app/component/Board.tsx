'use client'
import { useState } from "react";
import TodoItem from "./TodoItem";
import {useKanbanStore} from "@/store/todoStore";

interface BoardProps {
    title: string;
    board: "todo" | "progress" | "completed";
}



const Board = ({ title, board }: BoardProps) => {
    const { tasks, addTask } = useKanbanStore();
    const [newTask, setNewTask] = useState("");

    const handleAddTask = () => {
        if (newTask.trim()) {
            addTask(board, newTask);
            setNewTask("");
        }
    };

    return (
        <div className="todo-layout">
            <h2 className="todo-title">{title}</h2>
            <div className="mt-4 space-y-2">
                {tasks[board].map((task, index) => (
                    <TodoItem key={task.id} task={task} board={board} index={index} />
                ))}
            </div>

            {board === "todo" && (
                <div className="todo-input-box">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="할 일 추가..."
                        className="todo-work"
                    />
                    <button onClick={handleAddTask} className="todo-completed-button">
                        +
                    </button>
                </div>
            )}
        </div>
    );
};

export default Board;
