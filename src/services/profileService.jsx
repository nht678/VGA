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

export const actupdateProfileUniversity = async (data) => {
    try {
        const response = await BASE_API.put(`/university-location/${data.id}`, data.formData);
        if (response.status === 200) {
            message.success('Cập nhật thành công');
            return response;
        }
        message.error('Lỗi');
        return null; // Trả về null nếu status không phải 200
    } catch (error) {
        console.log(error);
        message.error('Lỗi gọi API');
        return null;
    }
}
// delete

export const actdeleteProfileUniversity = async (Id) => {
    try {
        const response = await BASE_API.delete(`/university-location/${Id}`);
        if (response.status === 200) {
            message.success('Xóa thành công');
            return response;
        }
        message.error('Lỗi');
        return null; // Trả về null nếu status không phải 200
    } catch (error) {
        console.log(error);
        message.error('Lỗi gọi API');
        return null;
    }
}
// tạo
export const actcreateProfileUniversity = async (data) => {
    try {
        const response = await BASE_API.post(`/university-location/${data?.id}`, data?.formDataLocation);
        if (response.status === 200) {
            message.success('Tạo thành công');
            return response;
        }
        message.error('Lỗi');
        return null; // Trả về null nếu status không phải 200
    } catch (error) {
        console.log(error);
        message.error('Lỗi gọi API');
        return null;
    }
}

// change password

export const actChangePassword = async (data) => {
    try {
        const response = await BASE_API.put(`/password/${data?.id}/?password=${data?.newPassword}`);
        if (response.status === 200) {
            message.success('Cập nhật thành công');
            return response;
        }
        message.error('Lỗi');
        return null; // Trả về null nếu status không phải 200
    } catch (error) {
        console.log(error);
        message.error('Lỗi gọi API');
        return null;
    }
}

