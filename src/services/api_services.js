import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getRequirementIds = async (filePath) => {
    const requesBody = { "file_path" : `C:/Users/I7997/Downloads/${filePath}` };
    try {
        const response = await axiosInstance.post('get-requirement-ids/', requesBody);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const generateCode = async (data) => {
    const requestBody = {
        "requirement_id": data.requirement_id,
        "language": data.language,
        "file_path": data.file_path,
    };
    try {
        const response = await axiosInstance.post('generate-code/', requestBody);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const generateTestCode = async (data) => {
    const requestBody = {
        "requirement_id": data.requirement_id,
        "language": data.language,
        "file_path": data.file_path,
        "code_file_path": data.code_file_path,
    };
    try {
        const response = await axiosInstance.post('generate-test-code/', requestBody);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const logCode = async (data) => {
    try{
        const response = await axiosInstance.post('log-code/', data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}