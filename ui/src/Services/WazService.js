

export default async function spread(credentials) {
    return fetch(BASE_URL + LOGIN, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then( data => data.json())
}