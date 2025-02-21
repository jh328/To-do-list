"use client"
import {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import BordPage from "@/app/component/Bord";
import Header from "@/app/component/Header";
import TodoPage from "@/app/component/Todo";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Page() {
    const [value, setValue] = useState<Value>(new Date());
    const [showCalendar, setShowCalendar] = useState<boolean>(false); // 달력 on,off 상태

    const formatDate = (date: Value) => {
        if (!date || Array.isArray(date)) return "";
        return date.toISOString().split("T")[0].replace(/-/g, '.');
    }

    const toggleCalendar = () => {
        setShowCalendar((prev) => !prev);
    };

    return (
        <div className="container">
            <div className="date-display text-center mb-[30px] text-blue-500 text-[25px]" onClick={toggleCalendar}>
                {formatDate(value)}
            </div>

            <Header/>
            {showCalendar && (
                <div className="calendar-wrapper">
                    <Calendar
                        onChange={(date) => {
                            setValue(date);
                            setShowCalendar(false);
                        }}
                        value={value}
                        calendarType="gregory"
                        locale="ko"
                        view="month"
                        prev2Label={null} //>> 화살표 지우는 속성
                        next2Label={null} //>> 화살표 지우는 속성
                        showNeighboringMonth={false} // 이전달, 다음달 요일 안생기는 속성
                    />
                </div>
            )}
            <div className="todo-container">
                <TodoPage/>
                <BordPage/>
            </div>
        </div>
    );
}
