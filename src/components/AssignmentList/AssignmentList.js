import React, { useEffect, useState } from "react";
import AssignmentListItem from "./AssignmentListItem";
import assignmentService from "../../api/services/assignmentService";

const AssignmentList = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        fetchAssignment();
    }, []);

    const fetchAssignment = async() => {
        try {
            const assignmentData = await assignmentService.getAllAssignments();
            setAssignments(assignmentData);
            console.log(assignmentData);
        } catch(error) {
            console.error('Error fetching assignments: ', error);
        }
    };

    const handleDelete = async(id) => {
        try {
            await assignmentService.deleteAssignment(id);
            fetchAssignment();
        } catch(error) {
            console.error('Error deleting assignment: ', error);
        }
    };

    const handleEdit = () => {
        fetchAssignment();
    };

    return (
        <div>
            <h2>Assignments List</h2>
            <ul>
                {assignments.map(assignment => (
                    <AssignmentListItem key={assignment.id} assignment={assignment} onDelete={() => handleDelete(assignment.id)} onEdit={handleEdit} />
                ))}
            </ul>
        </div>
    );
};

export default AssignmentList;