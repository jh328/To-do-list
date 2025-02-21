//src/app/component/Calendar/CalendarStyle.ts
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

// 캘린더 감싸주는 스타일

export const StyledCalendarWrapper = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    position:relative;
`

export const StyledCalendar = styled(Calendar)``;
