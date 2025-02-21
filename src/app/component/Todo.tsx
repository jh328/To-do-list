"use client"
import {useState} from "react";
import {useTodoStore} from "@/store/todoStore";

export default function TodoPage() {
    const todos = useTodoStore((state) => state.todos);
    const completeTodo = useTodoStore((state) => state.completeTodo);
    const modifyTodo = useTodoStore((state) => state.modifyTodo);
    const moveTodoUp = useTodoStore((state) => state.moveTodoUp);
    const moveTodoDown = useTodoStore((state) => state.moveTodoDown);

    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editText, setEditText] = useState<string>("");

    const onEdit = (index: number, currentText: string) => {
        setEditIndex(index);
        setEditText(currentText);
    };

    const onSave = (index: number) => {
        modifyTodo(index, editText);
        setEditIndex(null);
        setEditText("");
    };

    return (
        <div className="todo-box">
            <h6 className="todo-title">Todo</h6>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index} className="todo-item">
                        {editIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="todo-input"
                                />
                                <button onClick={() => onSave(index)}>저장</button>
                            </>
                        ) : (
                            <>
                                <span onClick={() => completeTodo(index)}>{todo} </span>

                                <div className="button-group">
                                    <button className="modify-text" onClick={() => onEdit(index, todo)}>
                                        <span className="hidden">수정</span>
                                        <span className="ico_modify"></span>
                                    </button>
                                    <button onClick={() => moveTodoUp(index)}>
                                        <span className="hidden">위로</span>
                                        <span className="ico_arrow"></span>
                                    </button>
                                    <button onClick={() => moveTodoDown(index)}>
                                        <span className="hidden">아래</span>
                                        <span className="ico_arrow_down"></span>
                                    </button>
                                </div>
                            </>
                        )}

                    </li>
                ))}
            </ul>
        </div>
    );
};
