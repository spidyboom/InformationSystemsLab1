import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.response.use(
    response => response,
    error => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const flatApi = {
    getAll: (page = 0, size = 10, name = '', sort = 'id,asc') =>
        api.get(`/flats?page=${page}&size=${size}&name=${name}&sort=${sort}`),
    getById: (id) => api.get(`/flats/${id}`),
    create: (data) => api.post('/flats', data),
    update: (id, data) => api.put(`/flats/${id}`, data),
    delete: (id) => api.delete(`/flats/${id}`),
};

export const refApi = {
    getHouses: () => api.get('/houses'),
    getCoordinates: () => api.get('/coordinates'),
    getAvailableCoordinates: () => api.get('/coordinates/available'), // ← НОВОЕ
};

export const specialApi = {
    deleteByFurnish: (furnish) => api.delete(`/special/delete-one-by-furnish?furnish=${furnish}`),
    countByFurnish: (furnish) => api.get(`/special/count-by-furnish?furnish=${furnish}`),
    byNamePrefix: (prefix) => api.get(`/special/by-name-prefix?prefix=${prefix}`),
    mostExpensiveWithoutBalcony: () => api.get('/special/most-expensive-without-balcony'),  // ← ИСПРАВЛЕНО
    totalPrice: () => api.get('/special/total-price'),
};

export default api;