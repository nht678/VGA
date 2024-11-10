import { BASE_API } from "./api";

const admissionmethodService = {
    getAdmissionMethods: ({ page, pageSize, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/admission-methods`, { params });
    },
    addAdmissionMethod: (data) =>
        BASE_API.post(`/admission-method`, data)
    ,
    updateAdmissionMethod: (data) =>
        BASE_API.put(`/admission-method/${data.id}`, data.formData)
    ,
    deleteAdmissionMethod: (id) =>
        BASE_API.delete(`/admission-method/${id}`)
    ,
}
export default admissionmethodService
