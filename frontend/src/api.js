import axios from 'axios';

// Set the base URL for the backend server
const API = axios.create({ baseURL: 'http://localhost:5136/api' });

export const fetchArticles = async (page = 1) => {
    try {
        const response = await API.get(`/articles?page=${page}`);
        console.log('API Response:', response.data); // Log API response
        return response;
    } catch (error) {
        console.error('Error in fetchArticles:', error);
        throw error; // Re-throw the error to handle it in the calling code
    }
};

export const createArticle = async (data) => {
    try {
        const response = await API.post('/articles/create', data);
        console.log('Article Created:', response.data); // Log the created article
        return response;
    } catch (error) {
        console.error('Error in createArticle:', error);
        throw error; // Re-throw the error to handle it in the calling code
    }
};
