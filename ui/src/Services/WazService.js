import axios from 'axios';
import { API_WAZ_CALCULATE_SPREAD, API_WAZ_SPREAD } from '../Config';

export async function spread() {
    return axios.get(
        API_WAZ_SPREAD
    ).then(response => response.data)
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                return error.response.data
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                return error.request
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                return error.message
            }
        })
}

export async function calculateSpread(credentials) {
    return axios.post(
        API_WAZ_CALCULATE_SPREAD,
        null,
        {
            headers:
                { "Authorization": `Bearer ${localStorage.auth}` }
        }
    ).then(response => response)
        .catch(error => {
            let result = null
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                result = error.response
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                result = error.request
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                result = error.message
            }
            return result
        })
}