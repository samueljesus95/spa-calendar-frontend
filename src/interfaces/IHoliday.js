export default class IHoliday {
    title;
    description;
    date;

    constructor(data) {
        this.title = data.localName;
        this.description = data.name;
        this.date = data.date;
    }
};