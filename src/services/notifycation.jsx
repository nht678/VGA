import { message } from "antd";
import { BASE_API } from "./api";

const notificationService = {
    getNotificationById: async (id) => {
        try {
            const response = await BASE_API.get(`/notification/account/${id}`);
            if (response.status === 200) {
                return response.data; // Trả về dữ liệu khi thành công
            }
            return null; // Trả về null nếu response không thành công
        } catch (error) {
            return null; // Trả về null khi có lỗi
        }
    },
};

export default notificationService;
