import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";  
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import assignmentService from "../../api/services/assignmentService";
import holidayService from "../../api/services/holidayService";

const Calendar = () => {
    const [assignments, setAssignments] = useState([]);
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        try {
            const assignmentData = await assignmentService.getAllAssignments();
            const holidaytData = await holidayService.getAllHolidays();
            setAssignments(assignmentData);
            setHolidays(holidaytData);
        } catch(error) {
            console.error('Error fetching assignments: ', error);
        }
    };

    return (
        <div className="container">
            <div className="row title" style={{ marginTop: "20px" }} >
                <div className="col-sm-12 btn btn-info">
                    Calendar
                </div>
            </div>
            <FullCalendar
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next,today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
                plugins={[dayGridPlugin, timeGridPlugin]}
                eventSources={[holidays, assignments]}
                selectable={true}
                editable={true}
                eventClick={function(info) {
                    console.log(info.event.title);
                }}
            />
        </div>
    )
}

export default Calendar;