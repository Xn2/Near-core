document.addEventListener('DOMContentLoaded', async function (e) {
  refreshTable()
});

async function refreshTable() {
  const stats = await (await fetch('/api/serverStats')).json()
  console.log(stats)
  stats.totalAddedScores = stats.totalAddedScores.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  stats.averageScore = stats.averageScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  stats.uptime = toHHMMSS(stats.uptime + "");
  for (const [key, value] of Object.entries(stats)) {
      document.getElementById(key).innerText = value
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

function toHHMMSS(p1) {
  var sec_num = parseInt(p1, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  var time    = hours+':'+minutes+':'+seconds;
  return time;
}

(function () {
  feather.replace({ 'aria-hidden': 'true' })
})()
