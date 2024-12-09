import { BASE_API } from "./api";

const reportService = {
    getReports: async ({ page, pageSize, search, TypeBooking, consultantID }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        if (search) {
            params.content = search;
        }
        if (TypeBooking) {
            params['booking-status'] = TypeBooking;
        }
        if (consultantID) {
            params['consultant-id'] = consultantID;
        }
        const response = await BASE_API.get(`/bookings`,
            {
                params
            }
        );
        debugger
        return response;
    },
};

export default reportService