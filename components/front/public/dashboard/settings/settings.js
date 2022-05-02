document.addEventListener('DOMContentLoaded', async function (e) {
  document.getElementById('changePasscode').addEventListener('click', function(){
    changePasscode()
  })
  document.getElementById('changePlayerName').addEventListener('click', function(){
    changePlayerName()
  })
  document.getElementById('saveSettings').addEventListener('click', function(){
    setSV6Settings()
  })
  const currentSettings = await (await fetch('/api/me/getSV6Settings')).json()
  const settings = await (await fetch('/web/dashboard/settings/settings.json')).json()
  console.log(settings)
  for (akaname of settings.akaname){
    const el = document.createElement("option")
    el.value = akaname.value
    el.innerText = akaname.name
    if (akaname.value == currentSettings.akaname) el.setAttribute('selected', true)
    document.getElementById('akaname').appendChild(el)
  }
  for (bgm of settings.bgm){
    const el = document.createElement("option")
    el.value = bgm.value
    el.innerText = bgm.name
    if (bgm.value == currentSettings.bgm) el.setAttribute('selected', true)
    document.getElementById('bgm').appendChild(el)
  }
  for (nemsys of settings.nemsys){
    const el = document.createElement("option")
    el.value = nemsys.value
    el.innerText = nemsys.name
    if (nemsys.value == currentSettings.nemsys) el.setAttribute('selected', true)
    document.getElementById('nemsys').appendChild(el)
  }
  for (subbg of settings.subbg){
    const el = document.createElement("option")
    el.value = subbg.value
    el.innerText = subbg.name
    if (subbg.value == currentSettings.subbg) el.setAttribute('selected', true)
    document.getElementById('subbg').appendChild(el)
  }
  for (stamp of settings.stamp){
    for(let i = 0; i < 4; i++){
      const el = document.createElement("option")
      el.value = stamp.value
      el.innerText = stamp.name
      if (stamp.value == currentSettings['stamp' + String.fromCharCode(65 + i)]) el.setAttribute('selected', true)
      document.getElementById('stamp' + String.fromCharCode(65 + i)).appendChild(el)
    }
  }
});

async function changePasscode(){
  const passCode = parseInt(document.getElementById('passcode').value)
  const previousPassCode = parseInt(document.getElementById('previousPassCode').value)
  const res = await fetch("/api/me/changePasscode", {method : "post", headers : {'Accept': 'application/json','Content-Type': 'application/json'}, body : JSON.stringify({passCode, previousPassCode})})
  if (res.status == 200){
    document.getElementById('success1').removeAttribute('hidden')
    document.getElementById('failure').setAttribute('hidden', 'true')
  }
  else{
    document.getElementById('success1').setAttribute('hidden', 'true')
    document.getElementById('failure').removeAttribute('hidden')
  }
}

async function changePlayerName(){
  const newName = document.getElementById('newName').value
  const res = await fetch("/api/me/changePlayerName", {method : "post", headers : {'Accept': 'application/json','Content-Type': 'application/json'}, body : JSON.stringify({newName})})
  if (res.status == 200){
    document.getElementById('success3').removeAttribute('hidden')
    document.getElementById('failure3').setAttribute('hidden', 'true')
  }
  else{
    document.getElementById('success3').setAttribute('hidden', 'true')
    document.getElementById('failure3').removeAttribute('hidden')
  }
}

async function setSV6Settings(){
  const akaname = parseInt(document.getElementById('akaname').value)
  const bgm = parseInt(document.getElementById('bgm').value)
  const subbg = parseInt(document.getElementById('subbg').value)
  const nemsys = parseInt(document.getElementById('nemsys').value)
  const stampA = parseInt(document.getElementById('stampA').value)
  const stampB = parseInt(document.getElementById('stampB').value)
  const stampC = parseInt(document.getElementById('stampC').value)
  const stampD = parseInt(document.getElementById('stampD').value)
  const res = await fetch("/api/me/setSV6Settings",{method : "post", headers : {'Accept': 'application/json','Content-Type': 'application/json'}, body : JSON.stringify({
    akaname,
    bgm,
    subbg,
    nemsys,
    stampA,
    stampB,
    stampC,
    stampD,
  })})
  if (res.status === 200) document.getElementById('success2').removeAttribute('hidden')
}

(function () {
  feather.replace({ 'aria-hidden': 'true' })
})()
