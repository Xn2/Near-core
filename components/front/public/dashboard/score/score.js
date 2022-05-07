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
    let tr = document.createElement('tr');
    tr.setAttribute('id', obj['friendCode'])
    for (const [key, value] of Object.entries(obj)) {
      let td = document.createElement('td')
      td.innerText = value
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
  let id = location.search.replace(/^.*?\=/, '');
  let diff = parseInt(id.split('-')[1])
  id = id.split('-')[0]
  try {
    const songInfo = await getSongInformation(id)
    if (diff === 3 && songInfo.difficulties[songInfo.difficulties.length - 1].diff === "MAXIMUM"){
      scores = await (await fetch(`/api/getChartLB/${id}/4`)).json()
    } 
    else{
      scores = await (await fetch(`/api/getChartLB/${id}/${diff}`)).json()
    }
    document.getElementById('nameTitle').innerText = `${songInfo.title} - ${songInfo.difficulties[diff].diff} ${songInfo.difficulties[diff].level}`
    let img1 = document.createElement('img')
    img1.setAttribute('src', `https://fairyjoke.net/api/games/sdvx/musics/${id}/${songInfo.difficulties[diff - 1].diff}.png?fallback=default`)
    img1.style = "border-style : solid; width : 15vw"
    document.getElementById('jacket1').appendChild(img1)
  }
  catch {
    document.getElementById('nameTitle').innerText = "NON EXISTANT"
    return;
  }
  for (score of scores.slice(0, 20)) {
    score.date = getFormattedDate(score.date)
    score.clearType = lamps[score.clearType]
  }
  document.getElementById('recentScores').appendChild(await createTable(scores.slice(0, 20), "scores"))
  console.log(scores)
}

async function addRival(friendCode) {
  const res = await fetch("/api/me/addRival", { method: "post", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ friendCode }) })
  refreshTable()
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
