document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('submitLogin').addEventListener('click', async(e) => {
        document.getElementById('failure').setAttribute('hidden', 'true')
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const postData = JSON.stringify({ username, password })
        const res = await fetch('/api/login', { method: "post", headers: new Headers({ 'content-type': 'application/json' }), body: postData });
        if (res.status == "200") {
            window.location.href = '/web/dashboard'
        } else {
            document.getElementById('failure').removeAttribute('hidden')
        }
    })
})