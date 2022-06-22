import { API_LOGIN, API_LOGOUT, API_USERS_ME } from "../Config"
import axios from 'axios';

export async function login(credentials) {
    let result = {
        success: false,
        data: null
    }
    const formBody = new FormData()
    formBody.append("username", credentials.username)
    formBody.append("password", credentials.password)
    return axios.post(API_LOGIN, formBody)
        .then(response => {
            result.success = true
            result.data = response.data
            return result
        })
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                result.data = error.response.data
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                result.data = error.request
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                result.data = error.message
            }
            return result
        })
}

export async function logout() {
    return axios.post(API_LOGOUT, null, { headers: { "Authorization": `Bearer ${localStorage.auth}` } })
    .then(response => {
        return response
    })
}

export async function me() {
    let result = {}
    return axios.get(API_USERS_ME, { headers: { "Authorization": `Bearer ${localStorage.auth}` } })
    .then(response => {
        return response
    }).catch(error => {
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
            result.status = 500
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            result = error.message
            result.status = 400
        }
        return result
    })
}