export default class IAssignment {
    id;
    title;
    description;
    start;
    end;

    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.start = data.startDate;
        this.end = data.endDate;
    }
};