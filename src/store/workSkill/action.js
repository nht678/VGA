import { message } from "antd";
import workSkillService from "../../services/workSkillService";

export const GET_WORK_SKILLS = "GET_WORK_SKILLS";
export const ADD_WORK_SKILL = "ADD_WORK_SKILL";
export const UPDATE_WORK_SKILL = "UPDATE_WORK_SKILL";
export const DELETE_WORK_SKILL = "DELETE_WORK_SKILL";

export function actGetWorkSkills(data) {
    return {
        type: GET_WORK_SKILLS,
        payload: data,
    };
}

export function actAddWorkSkill(data) {
    return {
        type: ADD_WORK_SKILL,
        payload: data,
    };
}

export function actUpdateWorkSkill(data) {
    return {
        type: UPDATE_WORK_SKILL,
        payload: data,
    };
}

export function actDeleteWorkSkill(id) {
    return {
        type: DELETE_WORK_SKILL,
        payload: id,
    };
}

export function actResetSuccess() {
    return {
        type: "RESET_SUCCESS",
    };
}

export const actGetWorkSkillsAsync = ({ page, pageSize, search }) => async (dispatch) => {
    try {
        const response = await workSkillService.getWorkSkills({ page, pageSize, search });
        dispatch(actGetWorkSkills(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const actAddWorkSkillAsync = (data) => async (dispatch) => {
    try {
        const response = await workSkillService.addWorkSkill(data);
        if (response.status === 200 || response.status === 201) {
            dispatch(actAddWorkSkill(response));
            message.success('Thêm mới thành công');
        } else {
            message.error('Thêm mới thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Thêm mới thất bại');
    }
};

export const actUpdateWorkSkillAsync = ({ formData, id }) => async (dispatch) => {
    try {
        const response = await workSkillService.updateWorkSkill({ id, formData });
        if (response.status === 200 || response.status === 201) {
            message.success('Cập nhật thành công');
            dispatch(actUpdateWorkSkill(response));
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Cập nhật thất bại');
    }
};

export const actDeleteWorkSkillAsync = (id) => async (dispatch) => {
    try {
        const response = await workSkillService.deleteWorkSkill(id);
        if (response.status === 200 || response.status === 204) {
            message.success('Xóa thành công');
            dispatch(actDeleteWorkSkill(id));
        } else {
            message.error('Xóa thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Xóa thất bại');
    }
};

