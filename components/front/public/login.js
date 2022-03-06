document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('submitLogin').addEventListener('click', async (e) => {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value 
        const postData = JSON.stringify({username, password})
        const res = await fetch('/api/login', {method : "post" , headers: new Headers({'content-type': 'application/json'}), body : postData});
        console.log(res)
    })
})