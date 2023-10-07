import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';  

export const fetchEvents = async (sortBy, sortOrder, page, limit, status) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}&status=${status}`, {

    });
    console.log("Got Response: " + response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// TODO: better error handling
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/events`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};
