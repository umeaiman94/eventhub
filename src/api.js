import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use(req => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth
export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const deleteAccount = () => API.delete('/auth/delete');
// Events
export const getEvents = () => API.get('/events');
export const getEvent = (id) => API.get(`/events/${id}`);
export const createEvent = (data) => API.post('/events', data);
export const updateEvent = (id, data) => API.put(`/events/${id}`, data);
export const deleteEvent = (id) => API.delete(`/events/${id}`);
export const getMyEvents = () => API.get('/events/my/events');

// Registrations
export const getMyRegistrations = () => API.get('/registrations/my');
export const createRegistration = (data) => API.post('/registrations', data);
export const getEventRegistrations = (eventId) => API.get(`/registrations/event/${eventId}`);
export const deleteRegistration = (id) => API.delete(`/registrations/${id}`);

// Upload
export const uploadImage = (formData) => API.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});