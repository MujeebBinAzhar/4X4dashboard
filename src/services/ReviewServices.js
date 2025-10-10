import requests from './httpService';

const ReviewServices = {
        addReview: async (body) => {
                return requests.post('/review/add', body);
        },
        addAllReviews: async (body) => {
                return requests.post('/review/add/all', body);
        },
        getAllReviews: async () => {
                return requests.get('/review');
        },
        getReviewById: async (id) => {
                return requests.get(`/review/${id}`);
        },
        updateReview: async (id, body) => {
                return requests.put(`/review/${id}`, body);
        },
        updateManyReviews: async (body) => {
                return requests.patch('/review/update/many', body);
        },
        updateStatus: async (id, body) => {
                return requests.put(`/review/status/${id}`, body);
        },
        deleteReview: async (id) => {
                return requests.delete(`/review/${id}`);
        },
        deleteManyReviews: async (body) => {
                return requests.patch(`/review/delete/many`, body);
        },
};

export default ReviewServices;
