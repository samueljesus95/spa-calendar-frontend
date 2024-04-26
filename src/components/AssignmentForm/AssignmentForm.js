import React, { useState } from "react";
import assignmentService from "../../api/services/assignmentService";
import moment from "moment";

const AssignmentForm = ({ onAssignmentAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [eventStartDate, setEventStartDate] = useState(new Date());
    const [eventStartHour, setEventStartHour] = useState('');
    const [eventEndDate, setEventEndDate] = useState(new Date());
    const [eventEndHour, setEventEndHour] = useState('');

    const handleDatetime = (date, time) => {
        let convertedDate = new Date();
        if (date != null && time != null) {
            convertedDate = moment(date.concat('T', time)).format();
        }
        return(
            convertedDate
        )
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        let startDate = handleDatetime(eventStartDate, eventStartHour);
        let endDate = handleDatetime(eventEndDate, eventEndHour);
        const assignment = { title, description, startDate, endDate };
        try {
            console.log(assignment);
            await assignmentService.addAssignment(assignment);
            onAssignmentAdded();
            handleCancel();
        } catch(error) {
            console.error('Error adding assignment: ', error);
        }
    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setEventStartDate('');
        setEventStartHour('');
        setEventEndDate('');
        setEventEndHour('');
    };

    return (
        <div>
            <h2>Add Assignment</h2>
            <form onSubmit={handleSubmit} onAbort={handleCancel}>
                <div>
                    <label htmlFor="assignmentTitle">Assignment:</label>
                    <input type="text" id="assignmentTitle" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="assignmentDescription">Description:</label>
                    <input type="text" id="assignmentDescription" value={description} onChange={e => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="assignmentStartEvent">Start Date:</label>
                    <input type="date" id="assignmentStartDate" value={eventStartDate} onChange={e => setEventStartDate(e.target.value)} required />
                    <input type="time" id="startHour" value={eventStartHour} onChange={e => setEventStartHour(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="assignmentEndEvent">End Date:</label>
                    <input type="date" id="assignmentEndDate" value={eventEndDate} onChange={e => setEventEndDate(e.target.value)} required />
                    <input type="time" id="endHour" value={eventEndHour} onChange={e => setEventEndHour(e.target.value)} required />
                </div>
                <button type="submit">Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
};

export default AssignmentForm;