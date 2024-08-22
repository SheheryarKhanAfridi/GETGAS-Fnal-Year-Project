// src/api/apiFetch.js
const apiFetch = (endpoint, options = {}) => {
    return fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, options)
      .then(response => response.json())
      .catch(error => {
        console.error('API Error:', error);
        throw error;
      });
  };
  
  export default apiFetch;
  