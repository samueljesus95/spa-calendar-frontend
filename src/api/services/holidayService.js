import axios from "axios";
import IHoliday from "../../interfaces/IHoliday";

const urlBrazil = 'https://date.nager.at/api/v3/PublicHolidays/2024/BR';
const holidayService = {
    getAllHolidays: async () => {
        const response = await axios.get(urlBrazil);
        const data = response.data.map(holiday => new IHoliday(holiday));
        return data;
    }
};

export default holidayService;