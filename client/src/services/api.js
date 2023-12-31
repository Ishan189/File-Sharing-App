import axios from 'axios';

// let API_URL = 'http://localhost:8000';
let API_URL = 'https://file-sharing-app-w5if.onrender.com' ;

export const uploadFile = async (data) => {
    try {
        let response = await axios.post(`${API_URL}/upload`, data);
        return response.data;
    } catch (error) {
        console.error('Error while calling the api', error.message);
    }
}