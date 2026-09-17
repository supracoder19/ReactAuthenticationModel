import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL||null
const publicApiClient = axios.create({
  // The base URL that will be prepended to all relative request endpoints
  baseURL: apiUrl, 
  
  // Abort request if it takes longer than 10 seconds
  timeout: 10000, 
  
  // Default headers applied to every request
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials:true
});

const privateApiClient = axios.create({
  // The base URL that will be prepended to all relative request endpoints
  baseURL: apiUrl, 
  
  // Abort request if it takes longer than 10 seconds
  timeout: 10000, 
  
  // Default headers applied to every request
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials:false
});

export {privateApiClient, publicApiClient};