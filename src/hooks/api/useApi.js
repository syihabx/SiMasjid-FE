import { useState } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5127/api';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const withLoading = async (promise) => {
    setIsLoading(true);
    try {
      const result = await promise;
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, withLoading };
};

const convertBooleansToStrings = (data) => {
  if (data && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (typeof value === 'boolean') {
          return [key, value ? "true" : "false"];
        }
        return [key, value];
      })
    );
  }
  return data;
};

const convertStringsToBooleans = (data) => {
  if (data && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (value === "true" || value === "false") {
          return [key, value === "true"];
        }
        return [key, value];
      })
    );
  }
  return data;
};

const useApi = () => {
  const handleResponse = (response) => {
    if (!response.data?.status) {
      throw new Error(response.data?.message || 'Request failed');
    }
    return {
      status: response.data.status,
      data: response.data.data, // Main data array
      totalData: response.data.totalData || 0,
      message: response.data.message
    };
  };

  const get = async (entity, params = {}) => {
    try {
      // console.log(`Calling GET: ${baseUrl}/DynamicCRUD/${entity}`);
      const response = await axios.get(`${baseUrl}/DynamicCRUD/${entity}`, {
        params,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      // console.log('API Response:', response);
      const processedData = convertStringsToBooleans(response.data.data);
      return handleResponse({
        ...response,
        data: {
          ...response.data,
          data: processedData
        }
      });
    } catch (error) {
      // console.error('API Error:', error);
      throw error;
    }
  };

  const post = async (entity, data) => {
    try {
      const processedData = convertBooleansToStrings(data);
      const response = await axios.post(`${baseUrl}/DynamicCRUD/${entity}`, processedData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      return handleResponse(response);
    } catch (error) {
      // console.error('API Error:', error);
      throw error;
    }
  };

  const put = async (entity, id, data) => {
    try {
      const processedData = convertBooleansToStrings(data);
      const response = await axios.put(`${baseUrl}/DynamicCRUD/${entity}/${id}`, processedData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      return handleResponse(response);
    } catch (error) {
      // console.error('API Error:', error);
      throw error;
    }
  };

  const del = async (entity, id) => {
    try {
      if (!entity || !id) {
        throw new Error('Entity and ID are required for delete operation');
      }

      const deleteUrl = `${baseUrl}/DynamicCRUD/${entity}/${id}`.replace(/\/+$/, '');
      
      const response = await axios.delete(deleteUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      // Check both HTTP status code and response data status
      if (response.status !== 200 || !response.data?.status) {
        throw new Error(response.data?.message || 'Delete operation failed');
      }

      return {
        status: true,
        message: response.data?.message || 'Item deleted successfully'
      };
    } catch (error) {
      console.error('API Delete Error:', error);
      throw error;
    }
  };

  return { get, post, put, del };
};

export default useApi;
