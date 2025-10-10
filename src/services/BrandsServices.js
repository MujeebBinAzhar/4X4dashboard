import requests from './httpService';

const BrandServices = {
    addBrand: async (body) => {
        return requests.post('/brand/add', body);
    },
    addAllBrand: async (body) => {
        return requests.post('/brand/add/all', body);
    },
    getAllBrands: async () => {
        return requests.get('/brand');
    },
    getBrandById: async (id) => {
        return requests.get(`/brand/${id}`);
    },
    updateBrand: async (id, body) => {
        return requests.put(`/brand/${id}`, body);
    },
    // updateManyBrands: async (body) => {
    //     return requests.patch('/brand/update/many', body);
    // },
    updateStatus: async (id, body) => {
        return requests.put(`/brand/status/${id}`, body);
    },
    deleteBrand: async (id) => {
        return requests.delete(`/brand/${id}`);
    },
    // deleteManyBrands: async (body) => {
    //     return requests.patch(`/brand/delete/many`, body);
    // },
};

export default BrandServices;
