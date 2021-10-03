function apiTest() {
    fetch("/api/test")
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                let par = document.getElementById("networkResponse")
                par.innerHTML = "Title is: " + result.title
            },
            (error) => {
                console.log(error)
            }
        )
}

apiTest()