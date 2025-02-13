import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8200/',
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

export const analyzeProject = async (projectName, llm_choice) => {
    const requestBody = {
        "project_name": projectName,
        "llm_choice": llm_choice,
    };
    try {
        const response = await axiosInstance.post('analyze_project/', requestBody);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const generateDocs = async (documentText, llmChoice) => {
    const requestBody = {
        "documentation_text": documentText,
        "llm_choice": llmChoice,
    };
    try {
        const response = await axiosInstance.post('generate-documentation/', requestBody);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const generateUserStories = async (scenarioList, llm_choice) => {
    const requestBody = {
        "list_test_scenarios": scenarioList,
        "llm_choice": llm_choice,
    };
    try{
        const response = await axiosInstance.post('generate-user-stories/', requestBody);
        return response.data;
        //return responseData;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const generateTestCases = async (llm_choice, documents_list) => {
    const requestBody = { 
        "llm_choice": llm_choice,
        "document_list": documents_list,
    };
    try{
        const response = await axiosInstance.post('generate-test-scenarios', requestBody);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}