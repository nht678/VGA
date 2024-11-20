import { BASE_API, TOKEN } from "./api";

const admissionmethodService = {
    getAdmissionMethods: ({ page, pageSize, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/admission-methods`, {
            params,
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });
    },
    addAdmissionMethod: (data) =>
        BASE_API.post(`/admission-method`, data)
    ,
    updateAdmissionMethod: (data) =>
        BASE_API.put(`/admission-method/${data.id}`, data.formData,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    deleteAdmissionMethod: (id) =>
        BASE_API.delete(`/admission-method/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
}
export default admissionmethodService
