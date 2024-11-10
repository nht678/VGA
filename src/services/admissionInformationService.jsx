import { BASE_API } from "./api"

const admissionInformationService = {
    getAdmissionInformation: ({ page, pageSize, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/admission-informations`, { params });
    },
    addAdmissionInformation: (data) =>
        BASE_API.post(`/admission-information`, data)
    ,
    updateAdmissionInformation: (data) =>
        BASE_API.put(`/admission-information/${data.id}`, data.formData)
    ,
    deleteAdmissionInformation: (id) =>
        BASE_API.delete(`/admission-information/${id}`)
    ,
}
export default admissionInformationService

