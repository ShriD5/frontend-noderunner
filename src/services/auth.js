import axios from 'axios';

const API_URL = 'https://noderunner.onrender.com';

const signup = async (email, password) => {
    try {
        console.log('Sending signup request...');
        const response = await axios.post(`${API_URL}/auth/signup`, { email, password });
        console.log('Signup request successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error signing up:', error.response.data);
        throw error.response.data;
    }
};

const login = async (email, password) => {
    try {
        console.log('Sending login request...');
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        console.log('Login request successful:', response.data);
        const { token, userId } = response.data;
        return { token, userId };
    } catch (error) {
        console.error('Error logging in:', error.response.data);
        throw error.response.data;
    }
};

export { signup, login };
