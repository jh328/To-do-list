import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Task {
    id: string;
    text: string;
}

interface KanbanState {
    tasks: {
        todo: Task[];
        progress: Task[];
        completed: Task[];
    };

    addTask: (board: "todo" | "progress" | "completed", text: string) => void;
    moveTask: (fromBoard: "todo" | "progress" | "completed", toBoard: "todo" | "progress" | "completed", taskId: string) => void;
    deleteTask: (board: "todo" | "progress" | "completed", taskId: string) => void;
    updateTask: (board: "todo" | "progress" | "completed", taskId: string, newText: string) => void;
    moveUp: (board: "todo" | "progress" | "completed", index: number) => void;
    moveDown: (board: "todo" | "progress" | "completed", index: number) => void;
}

export const useKanbanStore = create<KanbanState>()(
    persist(
        (set) => ({
            tasks: {
                todo: [],
                progress: [],
                completed: [],
            },

            addTask: (board, text) =>
                set((state) => ({
                    tasks: {
                        ...state.tasks,
                        [board]: [...state.tasks[board], { id: Date.now().toString(), text }],
                    },
                })),

            moveTask: (fromBoard, toBoard, taskId) =>
                set((state) => {
                    if (fromBoard === toBoard) return state; // ✅ 같은 보드 내에서는 이동하지 않음
                    const task = state.tasks[fromBoard].find((t) => t.id === taskId);
                    if (!task) return state;

                    return {
                        tasks: {
                            ...state.tasks,
                            [fromBoard]: state.tasks[fromBoard].filter((t) => t.id !== taskId),
                            [toBoard]: [...state.tasks[toBoard], task],
                        },
                    };
                }),

            deleteTask: (board, taskId) =>
                set((state) => ({
                    tasks: {
                        ...state.tasks,
                        [board]: state.tasks[board].filter((t) => t.id !== taskId),
                    },
                })),

            updateTask: (board, taskId, newText) =>
                set((state) => ({
                    tasks: {
                        ...state.tasks,
                        [board]: state.tasks[board].map((task) =>
                            task.id === taskId ? { ...task, text: newText } : task
                        ),
                    },
                })),

            moveUp: (board, index) =>
                set((state) => {
                    if (index === 0) return state;
                    const updatedList = [...state.tasks[board]];
                    [updatedList[index], updatedList[index - 1]] = [updatedList[index - 1], updatedList[index]];
                    return {
                        tasks: {
                            ...state.tasks,
                            [board]: updatedList,
                        },
                    };
                }),

            moveDown: (board, index) =>
                set((state) => {
                    if (index >= state.tasks[board].length - 1) return state;
                    const updatedList = [...state.tasks[board]];
                    [updatedList[index], updatedList[index + 1]] = [updatedList[index + 1], updatedList[index]];
                    return {
                        tasks: {
                            ...state.tasks,
                            [board]: updatedList,
                        },
                    };
                }),
        }),
        {
            name: "kanban-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
