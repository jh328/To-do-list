"use State"

import {useState} from "react"
import {useTodoStore} from "@/store/todoStore";

export default function Header() {
    const [text, setText] = useState<string>("");
    const addTodo = useTodoStore((state) => state.addTodo);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("ohChangeInput 실행")
        setText(e.target.value)
    };

    const onAddTodo= ()=>{
        if (text.trim() !== "") {
            addTodo(text);
            setText("");
        }
    }

    return (
        <div className="todo-list-header">
            <h6 className="todo-list">Todo List</h6>
            <input type="text"
                   placeholder="할 일을 추가해주세요."
                   className="todo-list-input"
                   onChange={onChangeInput}
                   value={text}/>
            <button className="add-button" onClick={onAddTodo}>+</button>
        </div>
    );
};