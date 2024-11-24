import { BASE_API, TOKEN } from "./api"

const admissionInformationService = {
    getAdmissionInformation: ({ page, pageSize, search, universityid }) => {
        console.log('TOKEN', TOKEN);
        const params = {
            'current-page': page,
            'page-size': pageSize,
            "university-id": universityid
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/admission-informations`, {
            params,
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });
    },
    addAdmissionInformation: ({ formData, universityId }) =>
        BASE_API.post(`/admission-information/${universityId}`, formData,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    updateAdmissionInformation: ({ formData }) =>
        BASE_API.put(`/admission-informations`, formData,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    deleteAdmissionInformation: (id) =>
        BASE_API.delete(`/admission-information/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
}
export default admissionInformationService

