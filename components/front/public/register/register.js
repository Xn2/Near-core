document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('submitRegister').addEventListener('click', async (e) => {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const cardID = document.getElementById('cardid').value
        const postData = JSON.stringify({username, password, cardID})
        const res = await fetch('/api/register', {method : "post" , headers: new Headers({'content-type': 'application/json'}), body : postData});
        if (res.status == "200"){
            document.getElementById('success').removeAttribute('hidden')
        }
    })
})