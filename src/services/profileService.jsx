import { message } from "antd";
import { BASE_API } from "./api";
// call api profileHighschool
export const fetdataProfileHighSchool = async (Id) => {
    try {
        const response = await BASE_API.get(`/high-school/${Id}`);
        if (response.status === 200) {
            return response.data;
        }
        message.error('Lỗi');
        return null; // Trả về null nếu status không phải 200
    } catch (error) {
        console.log(error);
        message.error('Lỗi gọi API');
        return null;
    }
}

export const fetchProfileUniversity = async (Id) => {
    try {
        const response = await BASE_API.get(`/university/${Id}`);
        if (response.status === 200) {
            return response.data;
        }
        message.error('Lỗi');
        return null; // Trả về null nếu status không phải 200
    } catch (error) {
        console.log(error);
        message.error('Lỗi gọi API');
        return null;
    }
}

