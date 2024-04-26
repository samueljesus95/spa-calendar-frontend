import axios from "axios";
import IAssignment from '../../interfaces/IAssignment';

const baseURL = 'https://localhost:44374/api/Assignment';
const assignmentService = {
    getAllAssignments: async () => {
        const response = await axios.get(baseURL);
        const data = response.data.map(assignment => new IAssignment(assignment));
        return data;
    },
    addAssignment: async(assignment) => {
        const response = await axios.post(baseURL, assignment);
        return response.data;
    },
    deleteAssignment: async(id) => {
        const response = await axios.delete(`${baseURL}/${id}`);
        return response.data;
    },
    updateAssignment: async(id, assignment) => {
        const response = await axios.put(`${baseURL}/${id}`, assignment);
        return response.data;
    }
};

export default assignmentService;