/* globals Chart:false, feather:false */

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
    header.appendChild(tr)
    let body = document.createElement('tbody')
    for (obj of arr) {
        let tr = document.createElement('tr');
        tr.setAttribute('id', obj['id'])
        let id = obj['id']
        for (const [key, value] of Object.entries(obj)) {
            let td = document.createElement('td')
            td.innerText = value
            td.addEventListener('click', () => {window.location.href = "/web/dashboard/challenge?c=" + id})
            tr.appendChild(td)
        }
        let td = document.createElement('td')
        if (deletable) {
            td.appendChild(createDeleteButton(entity, tr.getAttribute('id'), editable, customFieldFunc))
        }
        tr.appendChild(td);
        if (editable) {
            let td2 = document.createElement('td');
            td2.appendChild(createEditButton(tr.getAttribute('id')));
            tr.appendChild(td2);
        }
        if (typeof customFieldFunc == "function") {
            customFieldFunc(tr);
        }
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
    console.log(split.join(' '))
    return split.join(' ')
}

function createDeleteButton(entity, id, func) {
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.style = 'font-size : 10px'
    deleteButton.innerText = "Remove";
    deleteButton.addEventListener('click', (e) => {})
}

document.addEventListener('DOMContentLoaded', async function(e) {
    let res;
    try {
        res = await(await fetch('/api/getCustomSACourses')).json();
    }
    catch {
        window.location.href = '/web/login'
    }
    for (i in res){
        for (j in res[i].tracks){
            console.log(res[i].tracks[j])
            const songInfo = await getSongInformation(res[i].tracks[j].mid)
            if (parseInt(res[i].tracks[j].mty) === 4) res[i].tracks[j].mty = 3
            res[i].tracks[j] = songInfo.title + " " + songInfo.difficulties[parseInt(res[i].tracks[j].mty)].level
        }
    }
    const table = await createTable(res, "Custom Skill Analyzer courses")
    document.getElementById('table').appendChild(table)
    document.getElementById('loading').setAttribute('hidden', 'true')
});

async function getSongInformation(mid) {
        const res = await fetch(`https://fairyjoke.net/api/games/sdvx/musics/${mid}`)
        if (res.status !== 200){
            return { title: "NOT FOUND", diff: "NOT FOUND", level: 0, success : false }
        }
        const json = await res.json();
        json.success = true;
        return json
}

function getFormattedDate(ts) {
    const date = new Date(ts)
    const formatted = `${date.getDate()}`.padStart(2, '0') +
        "/" + `${(date.getMonth()+1)}`.padStart(2, '0') +
        "/" + `${date.getFullYear()}`.padStart(2, '0') +
        " " + `${date.getHours()}`.padStart(2, '0') +
        ":" + `${date.getMinutes()}`.padStart(2, '0') +
        ":" + `${date.getSeconds()}`.padStart(2, '0');
    return formatted
}

(function() {
    feather.replace({ 'aria-hidden': 'true' })
})()