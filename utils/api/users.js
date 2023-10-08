import axios from 'axios';

// TODO: Should be based on .env
const API_BASE_URL = 'http://localhost:3000/';  

export const fetchUsers = async ( ) => {
  try {
    const response = await axios.get(`${API_BASE_URL}users`, {

    });
    console.log("Got Response: " + response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching Users:', error);
    throw error;
  }
};

// TODO: better error handling
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
