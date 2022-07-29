let rivals;
async function createTable(
  arr,
  entity,
  editable = false,
  customFieldFunc = null,
  deletable = true
) {
  if (!arr.length) {
    const warn = document.createElement('h5');
    warn.innerText = `No ${entity} yet. `;
    warn.style = 'text-align:center';
    return warn;
  }
  let table = document.createElement('table');
  table.classList.add('table', 'table-striped', 'table-sm');
  let header = document.createElement('thead');
  let tr = document.createElement('tr');
  for (property in arr[0]) {
    let th = document.createElement('th');
    th.setAttribute('scope', 'col');
    th.innerText = capitalize(property);
    tr.appendChild(th);
  }
  if (deletable) {
    let th = document.createElement('th');
    th.setAttribute('scope', 'col');
    th.innerText = 'Remove';
    tr.appendChild(th);
  }
  header.appendChild(tr);
  let body = document.createElement('tbody');
  for (obj of arr) {
    let tr = document.createElement('tr');
    let name = obj.name;
    tr.setAttribute('id', obj['friendCode']);
    for (const [key, value] of Object.entries(obj)) {
      let td = document.createElement('td');
      td.innerText = value;
      td.addEventListener('click', () => {
        window.location.href = '/web/dashboard/profile?p=' + name;
      });
      tr.appendChild(td);
    }
    let td = document.createElement('td');
    if (deletable) {
      td.appendChild(createDeleteButton(tr.getAttribute('id')));
    }
    tr.appendChild(td);
    body.appendChild(tr);
  }
  table.appendChild(header);
  table.appendChild(body);
  return table;
}

function capitalize(str) {
  const split = str.split(' ');
  for (i in split) {
    split[i] = split[i][0].toUpperCase() + split[i].slice(1);
  }
  return split.join(' ');
}

function createDeleteButton(friendCode) {
  console.log(friendCode);
  let deleteButton = document.createElement('button');
  deleteButton.setAttribute('type', 'button');
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.style = 'font-size : 10px';
  deleteButton.innerText = 'Remove';
  deleteButton.addEventListener('click', (e) => {
    deleteRival(friendCode);
  });
  return deleteButton;
}

async function deleteRival(friendCode) {
  const res = await fetch('/api/me/removeRival', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ friendCode }),
  });
  refreshTable();
}

document.addEventListener('DOMContentLoaded', async function (e) {
  refreshTable();
  document.getElementById('addRival').addEventListener('click', function (e) {
    addRival(document.getElementById('codeInput').value);
  });
});

async function refreshTable() {
  const res = await (await fetch('/api/me/getRivals')).json();
  const res2 = await (await fetch('/api/getAllPlayers')).json();
  const table = await createTable(res, 'Rivals');
  const table2 = await createTable(res2, 'Users', false, null, false);
  document.getElementById('tableRivals').innerHTML = '';
  document.getElementById('tableRivals').appendChild(table);
  document.getElementById('tableUsers').innerHTML = '';
  document.getElementById('tableUsers').appendChild(table2);
}

async function addRival(friendCode) {
  const res = await fetch('/api/me/addRival', {
    method: 'post',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ friendCode }),
  });
  refreshTable();
}
//
async function getSongInformation(mid) {
  const res = await fetch(
    `https://fairyjoke.net/api/games/sdvx/musics/${mid}`,
    { mode: 'no-cors' }
  );
  return await res.json();
}

function getFormattedDate(ts) {
  const date = new Date(ts);
  const formatted =
    `${date.getDate()}`.padStart(2, '0') +
    '/' +
    `${date.getMonth() + 1}`.padStart(2, '0') +
    '/' +
    `${date.getFullYear()}`.padStart(2, '0') +
    ' ' +
    `${date.getHours()}`.padStart(2, '0') +
    ':' +
    `${date.getMinutes()}`.padStart(2, '0') +
    ':' +
    `${date.getSeconds()}`.padStart(2, '0');
  return formatted;
}

(function () {
  feather.replace({ 'aria-hidden': 'true' });
})();
