import axios from 'axios';
import { responseData } from './sample_data';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
    }
});



export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file); 
  
    try {
      const response = await axiosInstance.post('upload-extract/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
          'accept': 'application/json',
        },
      });
  
      console.log('Response from server:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
};

export const analyzeProject = async (projectName) => {
    const requestBody = {
        "project_name": projectName,
    };
    try {
        const response = await axiosInstance.post('analyze_project/', requestBody, {
            responseType: 'arraybuffer',
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const generateDocs = async (type, projectName) => {
    const requestBody = {
        "project_name": projectName,
    };
    try {
        let response;
        if(type==='small'){
            response = await axiosInstance.post('small-generate-docs/', requestBody);
        } else if(type==='medium'){
            response = await axiosInstance.post('medium-generate-docs/', requestBody);
        } else {
            response = await axiosInstance.post('large-generate-docs/', requestBody);
        }
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const generateUserStories = async (requirements) => {
    const requestBody = {
        "requirements": requirements
    };
    try{
        // const response = await axiosInstance.post('generate-user-stories/', requestBody);
        // return response.data;
        return responseData;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const generateTestCases = async (data) => {
    const requestBody = { "user_stories": data };
    try{
        const response = await axiosInstance.post('generate-test-scenarios/', requestBody);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}