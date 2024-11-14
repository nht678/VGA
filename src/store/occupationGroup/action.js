import { message } from "antd";
import occupationGroupService from "../../services/occupationGroupService";

export const ACT_GET_OCCUPATION_GROUP = "ACT_GET_OCCUPATION_GROUP";
export const ACT_ADD_OCCUPATION_GROUP = "ACT_ADD_OCCUPATION_GROUP";
export const ACT_UPDATE_OCCUPATION_GROUP = "ACT_UPDATE_OCCUPATION_GROUP";
export const ACT_DELETE_OCCUPATION_GROUP = "ACT_DELETE_OCCUPATION_GROUP";

export function actGetOccupationGroup(data) {
    return {
        type: ACT_GET_OCCUPATION_GROUP,
        payload: data,
    };
}

export function actAddOccupationGroup(data) {
    return {
        type: ACT_ADD_OCCUPATION_GROUP,
        payload: data,
    };
}

export function actUpdateOccupationGroup(data) {
    return {
        type: ACT_UPDATE_OCCUPATION_GROUP,
        payload: data,
    };
}

export function actDeleteOccupationGroup(id) {
    return {
        type: ACT_DELETE_OCCUPATION_GROUP,
        payload: id,
    };
}

export function resetOccupationGroupSuccess() {
    return {
        type: "RESET_OCCUPATION_GROUP",
    };
}

export const actGetOccupationGroupAsync = ({ page, pageSize, search }) => async (dispatch) => {
    try {
        const response = await occupationGroupService.getOccupationGroups({ page, pageSize, search });
        dispatch(actGetOccupationGroup(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const actAddOccupationGroupAsync = (data) => async (dispatch) => {
    try {
        const response = await occupationGroupService.addOccupationGroup(data);
        if (response.status === 200 || response.status === 201) {
            dispatch(actAddOccupationGroup(response));
            message.success('Thêm mới thành công');
        } else {
            message.error('Thêm mới thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Thêm mới thất bại');
    }
};

export const actUpdateOccupationGroupAsync = ({ formData, id }) => async (dispatch) => {
    try {
        const response = await occupationGroupService.updateOccupationGroup({ id, formData });
        if (response.status === 200 || response.status === 201) {
            message.success('Cập nhật thành công');
            dispatch(actUpdateOccupationGroup(response));
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Cập nhật thất bại');
    }
};

export const actDeleteOccupationGroupAsync = (id) => async (dispatch) => {
    try {
        const response = await occupationGroupService.deleteOccupationGroup(id);
        if (response.status === 200 || response.status === 201) {
            message.success('Xóa thành công');
            dispatch(actDeleteOccupationGroup(id));
        } else {
            message.error('Xóa thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Xóa thất bại');
    }
};


