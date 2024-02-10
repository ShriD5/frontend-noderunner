
import axios from 'axios';

const API_URL = 'https://noderunner-api.onrender.com/api/sandbox';


const sandboxService = {
    getSandboxById: async (sandboxId) => {
        try {
            const response = await axios.get(`${API_URL}/sandbox/${sandboxId}`);
            return response.data;
        } catch (error) {
            throw error.response.data.error || 'Failed to retrieve sandbox';
        }
    },

};
const executeCode = async (code) => {
    try {
        const response = await axios.post(`https://noderunner-api.onrender.com/api/execute`, { code });
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error.response.data.error || 'Failed to execute code';
    }
}

const createSandbox = async (userId, code) => {
    try {
        const response = await axios.post(API_URL, { user: userId, code });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// retrieve all sandboxes for a user
const getSandboxesByUser = async (userId) => {
    try {
        const response = await axios.post(`https://noderunner-api.onrender.com/api/user`, { userId });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// retrieve a single sandbox by its ID
const getSandboxById = async (sandboxId) => {
    try {
        const response = await axios.get(`${API_URL}/${sandboxId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }

};

//  update a sandbox
const updateSandbox = async (sandboxId, code) => {
    try {
        const response = await axios.put(`${API_URL}/${sandboxId}`, { code });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

//  delete a sandbox
const deleteSandbox = async (sandboxId) => {
    try {
        const response = await axios.delete(`${API_URL}/${sandboxId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export { createSandbox, getSandboxesByUser, getSandboxById, updateSandbox, deleteSandbox, executeCode, sandboxService };
