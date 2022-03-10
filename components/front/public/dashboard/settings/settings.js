document.addEventListener('DOMContentLoaded', async function (e) {
  document.getElementById('changePasscode').addEventListener('click', function(){
    changePasscode()
  })
});

async function changePasscode(){
  const passCode = parseInt(document.getElementById('passcode').value)
  const previousPassCode = parseInt(document.getElementById('previousPassCode').value)
  const res = await fetch("/api/me/changePasscode", {method : "post", headers : {'Accept': 'application/json','Content-Type': 'application/json'}, body : JSON.stringify({passCode, previousPassCode})})
  if (res.status == 200){
    document.getElementById('success').removeAttribute('hidden')
    document.getElementById('failure').setAttribute('hidden', 'true')
  }
  else{
    document.getElementById('success').setAttribute('hidden', 'true')
    document.getElementById('failure').removeAttribute('hidden')
  }
}

(function () {
  feather.replace({ 'aria-hidden': 'true' })
})()
