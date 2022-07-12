let rivals
let profile
let scores
const lamps = ["FAILED", "FAILED", "CLEAR", "EXCESSIVE CLEAR", "ULTIMATE CHAIN", "PUC"]
async function createTable(arr, entity, editable = false, customFieldFunc = null, deletable = false) {
  if (!arr.length) {
    const warn = document.createElement("h5")
    warn.innerText = `No ${entity} yet. `
    warn.style = "text-align:center"
    return warn
  }
  let table = document.createElement('table')
  table.classList.add('table', 'table-striped', 'table-sm')
  let header = document.createElement('thead');
  let tr = document.createElement('tr')
  for (property in arr[0]) {
    if (property == "musicID" || property == 'musicType'){
      continue
    }
    let th = document.createElement('th')
    th.setAttribute("scope", "col")
    th.innerText = capitalize(property)
    tr.appendChild(th)
  }
  if (deletable) {
    let th = document.createElement('th')
    th.setAttribute("scope", "col")
    th.innerText = "Remove"
    tr.appendChild(th)
  }
  header.appendChild(tr)
  let body = document.createElement('tbody')
  for (obj of arr) {
    let id = obj['musicID'] + "-" + obj['musicType']
    let tr = document.createElement('tr');
    tr.setAttribute('id', obj['friendCode'])
    for (const [key, value] of Object.entries(obj)) {
      if (key == "musicID" || key == 'musicType'){
        continue
      }
      let td = document.createElement('td')
      td.innerText = value
      td.addEventListener('click', () => {window.location.href = "/web/dashboard/score?m=" + id})
      tr.appendChild(td)
    }
    let td = document.createElement('td')
    if (deletable) {
      td.appendChild(createDeleteButton(tr.getAttribute('id')))
    }
    tr.appendChild(td);
    body.appendChild(tr)
  }
  table.appendChild(header)
  table.appendChild(body)
  return table
}

function capitalize(str) {
  const split = str.split(' ');
  for (i in split) {
    split[i] = split[i][0].toUpperCase() + split[i].slice(1)
  }
  return split.join(' ')
}

function createDeleteButton(friendCode) {
  console.log(friendCode)
  let deleteButton = document.createElement('button');
  deleteButton.setAttribute('type', 'button');
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.style = 'font-size : 10px'
  deleteButton.innerText = "Remove";
  deleteButton.addEventListener('click', (e) => {
    deleteRival(friendCode)
  })
  return deleteButton
}

async function deleteRival(friendCode) {
  const res = await fetch('/api/me/removeRival', {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:
      JSON.stringify({ friendCode })
  })
  document.getElementById(friendCode).remove()
}

document.addEventListener('DOMContentLoaded', async function (e) {
  refreshTable()
});

async function refreshTable() {
  const profileName = location.search.replace(/^.*?\=/, '');
  try {
    profile = await (await fetch('/api/profile/' + profileName)).json()
    scores = await (await fetch('/api/scores/' + profileName)).json()
    document.getElementById('nameTitle').innerText = profileName.toUpperCase()
  }
  catch {
    document.getElementById('nameTitle').innerText = "NON EXISTANT"
    return;
  }
  for (score of scores.slice(0, 20)) {
    const songInfo = await getSongInformation(score.musicID)
    if (parseInt(score.musicType) === 4) score.musicType = 3
    score.date = getFormattedDate(score.date)
    score.clearType = lamps[score.clearType]
    score.title = songInfo.title
    if (songInfo.success && songInfo.difficulties.length > 1) {
        score.diff = songInfo.difficulties[parseInt(score.musicType)].diff
        score.level = songInfo.difficulties[parseInt(score.musicType)].level
    }
  }
  const apeca = document.createElement('img')
  apeca.setAttribute('src', 'https://fairyjoke.net/api/games/sdvx/apecas/' + profile.apecaID + ".png")
  document.getElementById('apeca').appendChild(apeca)
  document.getElementById('totalScores').innerText = scores.length
  document.getElementById('skill').innerText = getLevelName(profile.skillLV)
  document.getElementById('joined').innerText = getFormattedDate(profile.createdAt)
  document.getElementById('lastOnline').innerText = getFormattedDate(profile.updatedAt)
  document.getElementById('addRival').addEventListener('click', function (e) {
    addRival(profile.friendCode)
    window.location.href = '/web/dashboard/users'
  })
  document.getElementById('recentScores').appendChild(await createTable(scores.slice(0, 20), "scores"))
  console.log(profile)
  console.log(scores)
}

async function addRival(friendCode) {
  const res = await fetch("/api/me/addRival", { method: "post", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ friendCode }) })
  refreshTable()
}

function getLevelName(slvl) {
  switch(slvl) {
    case 1:
      return "岳翔";
      break;
    case 2:
      return "流星";
      break;
    case 3:
      return "月衝";
      break;
    case 4:
      return "瞬光";
      break;
    case 5:
      return "天極";
      break;
    case 6:
      return "烈風";
      break;
    case 7:
      return "雷電";
      break;
    case 8:
      return "麗華";
      break;
    case 9:
      return "魔騎士";
      break;
    case 10:
      return "剛力羅";
      break;
    case 11:
      return "或帝滅斗"; 
      break;
    case 12:
      return "暴龍天";
      break;
  }         
}

async function getSongInformation(mid) {
  const res = await fetch(`https://fairyjoke.net/api/games/sdvx/musics/${mid}`)
  if (res.status != 200) {
    return { title: "NOT FOUND", diff: "NOT FOUND", level: 0, success: false }
  }
  const json = await res.json();
  json.success = true;
  return json

}
function getFormattedDate(ts) {
  const date = new Date(ts)
  const formatted = `${date.getDate()}`.padStart(2, '0') +
    "/" + `${(date.getMonth() + 1)}`.padStart(2, '0') +
    "/" + `${date.getFullYear()}`.padStart(2, '0') +
    " " + `${date.getHours()}`.padStart(2, '0') +
    ":" + `${date.getMinutes()}`.padStart(2, '0') +
    ":" + `${date.getSeconds()}`.padStart(2, '0');
  return formatted
}

(function () {
  feather.replace({ 'aria-hidden': 'true' })
})()
