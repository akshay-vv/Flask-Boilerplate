import { API_LOGIN, API_LOGOUT } from "../Config"

export async function login(credentials) {
    const formBody = Object.keys(credentials).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(credentials[key])).join('&');
    return fetch(API_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    }).then(data => data.json())
}

export async function logout() {
    return fetch(API_LOGOUT, {
        method: 'POST'
    }).then(data => data.json())
}