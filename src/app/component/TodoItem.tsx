import { useState } from "react";
import {useKanbanStore} from "@/store/todoStore";

interface TodoItemProps {
    task: { id: string; text: string };
    board: "todo" | "progress" | "completed";
    index: number;
}


const TodoItem = ({ task, board, index }: TodoItemProps) => {
    const { moveTask, deleteTask, moveUp, moveDown, updateTask } = useKanbanStore();
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(task.text);

    const handleEdit = () => {
        if (board !== "completed") {
            setIsEditing(true)
        }
    };

    const handleUpdate = () => {
        if (board !== "completed") {
            updateTask(board, task.id, newText);
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleUpdate();
        if (e.key === "Escape") setIsEditing(false);
    };

    return (
        <div className="todo-backgroud">
            {isEditing ? (
                <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleUpdate}
                    autoFocus
                    className="todo-input-event"
                />
            ) : (
                <span onDoubleClick={handleEdit} className={`cursor-pointer ${board === "completed" ? "cursor-not-allowed" : ""}`}>
                    {task.text}
                </span>
            )}
            <div className="flex gap-1">
                {board === "todo" && (
                    <button onClick={() => moveTask(board, "progress", task.id)}>▶</button>
                )}
                {board === "progress" && (
                    <button onClick={() => moveTask(board, "completed", task.id)}>✔</button>
                )}
                {board !== "completed" && (
                    <>
                        <button onClick={() => moveUp(board, index)}>
                            <span className="hidden">올리기</span>
                            <span className="ico_arrow"></span>
                        </button>
                        <button onClick={() => moveDown(board, index)}>
                            <span className="hidden">내리기</span>
                            <span className="ico_arrow_down"></span>
                        </button>
                    </>
                )}
                <button onClick={() => deleteTask(board, task.id)}>
                    <span className="hidden">취소</span>
                    <span className="button-close"></span>
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
