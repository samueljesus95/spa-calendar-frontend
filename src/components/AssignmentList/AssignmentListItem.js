import React, { useState } from "react";
import assignmentService from "../../api/services/assignmentService";

const AssignmentListItem = ({ assignment, onDelete, onEdit }) => {
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(assignment.title);
    const [editedDescription, setEditedDescription] = useState(assignment.description);
    const [editedStartDate, setEditedStartDate] = useState(assignment.startDate);
    const [editedStartHour, setEditedStartHour] = useState(assignment.startHour);
    const [editedEndDate, setEditedEndDate] = useState(assignment.endDate);
    const [editedEndHour, setEditedEndHour] = useState(assignment.endHour);

    const handleEdit = async() => {
        setEditing(true);
    };

    const handleSave = async() => {
        const editedAssignment = { ...assignment, title: editedTitle, description: editedDescription, startDate: editedStartDate, startHour: editedStartHour, endDate: editedEndDate, endHour: editedEndHour};
        try {
            await assignmentService.updateAssignment(assignment.id, editedAssignment);
            setEditing(false);
            onEdit();
        } catch(error) {
            console.error('Error updating assignment: ', error);
        }
    };

    const handleCancel = () => {
        setEditing(false);
        setEditedTitle(assignment.title);
        setEditedDescription(assignment.description);
        setEditedStartDate(assignment.startDate);
        setEditedStartHour(assignment.startHour);
        setEditedEndDate(assignment.endDate);
        setEditedEndHour(assignment.endHour);
    };

    return (
        <li>
            {editing ? (
                <div>
                    <div>
                        <input type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} required />
                    </div>
                    <div>
                        <input type="text" value={editedDescription} onChange={e => setEditedDescription(e.target.value)} required />
                    </div>
                    <div>
                        <input type="date" value={editedStartDate} onChange={e => setEditedStartDate(e.target.value)} required />
                        <input type="number" min={1} max={24} value={editedStartHour} onChange={e => setEditedStartHour(e.target.value)} required />
                    </div>
                    <div>
                        <input type="date" value={editedEndDate} onChange={e => setEditedEndDate(e.target.value)} required />
                        <input type="number" min={1} max={24} value={editedEndHour} onChange={e => setEditedEndHour(e.target.value)} required />
                    </div>
                    <div>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <span>{assignment.title} - {assignment.description} - {assignment.date} - {assignment.duration}</span>
                    <div>
                        <button onClick={onDelete}>Delete</button>
                        <button onClick={handleEdit}>Edit</button>
                    </div>
                </div>
            )}
        </li>
    );
};

export default AssignmentListItem;