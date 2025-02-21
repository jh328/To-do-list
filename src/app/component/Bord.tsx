"use client"

import {useTodoStore} from "@/store/todoStore";

export default function BordPage() {
    const completedTodos = useTodoStore((state) => state.completedTodos);
    const removeTodo = useTodoStore((state) => state.removeTodo);
    const completedMoveUp = useTodoStore((state) => state.moveCompletedUp);
    const completedMoveDown = useTodoStore((state) => state.moveCompletedDown);

    return (
        <div className="todo-box">
            <h6 className="todo-title">Done(완성)</h6>
            <ul>
                {completedTodos.map((todo, index) => (
                    <li key={index} className="todo-item">
                        ✅{todo}
                        <div className="button-group">
                            <button onClick={() => removeTodo(index)}>
                                <span className="hidden">취소</span>
                                <span className="button-close"></span>
                            </button>
                            <button onClick={() => completedMoveUp(index)}>
                                <span className="hidden">위로</span>
                                <span className="ico_arrow"></span>
                            </button>
                            <button onClick={() => completedMoveDown}>
                                <span className="hidden">아래</span>
                                <span className="ico_arrow_down"></span>
                            </button>
                        </div>
                    </li>

                ))}
            </ul>
        </div>
    );

};
