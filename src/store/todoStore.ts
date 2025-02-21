import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodoState {
    todos: string[];
    completedTodos: string[];
    addTodo: (todo: string) => void;
    completeTodo: (index: number) => void;
    removeTodo: (index: number) => void;
    modifyTodo: (index: number, newText: string) => void;
    moveTodoUp: (index: number) => void;
    moveTodoDown: (index: number) => void;
    moveCompletedUp: (index: number) => void;
    moveCompletedDown: (index: number) => void;
}

export const useTodoStore = create<TodoState>()(
    persist(
        (set) => ({
            todos: [],
            completedTodos: [],

            addTodo: (todo) => set((state) => ({
                todos: [...state.todos, todo]
            })),

            completeTodo: (index) => set((state) => {
                const newTodos = [...state.todos];
                const completed = newTodos.splice(index, 1);
                return {
                    todos: newTodos,
                    completedTodos: [...state.completedTodos, ...completed],
                };
            }),

            removeTodo: (index) => set((state) => {
                const newCompletedTodos = [...state.completedTodos];
                newCompletedTodos.splice(index, 1);
                return { completedTodos: newCompletedTodos };
            }),

            modifyTodo: (index, newText) => set((state) => {
                const newTodos = [...state.todos];
                if (index >= 0 && index < newTodos.length) {
                    newTodos[index] = newText;
                }
                return { todos: newTodos };
            }),

            moveTodoUp: (index) => set((state) => {
                if (index === 0) return state;
                const newTodos = [...state.todos];
                [newTodos[index], newTodos[index - 1]] = [newTodos[index - 1], newTodos[index]];
                return { todos: newTodos };
            }),

            moveTodoDown: (index) => set((state) => {
                if (index === state.todos.length - 1) return state;
                const newTodos = [...state.todos];
                [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];
                return { todos: newTodos };
            }),

            moveCompletedUp: (index) => set((state) => {
                if (index === 0) return state;
                const newCompleted = [...state.completedTodos];
                [newCompleted[index], newCompleted[index - 1]] = [newCompleted[index - 1], newCompleted[index]];
                return { completedTodos: newCompleted };
            }),

            moveCompletedDown: (index) => set((state) => {
                if (index === state.completedTodos.length - 1) return state;
                const newCompleted = [...state.completedTodos];
                [newCompleted[index], newCompleted[index + 1]] = [newCompleted[index + 1], newCompleted[index]];
                return { completedTodos: newCompleted };
            }),
        }),
        {
            name: "todo-storage", // ✅ 로컬 스토리지에서 저장될 key 값
        }
    )
);
