import Board from "./Board";

const KanbanBoard = () => {
    return (
        <div className="todo-kanbanbord">
            <Board title="Todo" board="todo" />
            <Board title="진행 중" board="progress" />
            <Board title="완료" board="completed" />
        </div>
    );
};

export default KanbanBoard;
