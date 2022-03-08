document.addEventListener('DOMContentLoaded', async function (e) {
  document.getElementById('export').addEventListener('click', function(){
    getTachiExport()
  })
});

async function getTachiExport(){
  let maxVersion = 5
  if (document.getElementById("noRemoveSV6").checked){
    maxVersion = 6
  }
  const res = await ( await fetch("/api/me/tachiExport", {method : "post", headers : {'Accept': 'application/json','Content-Type': 'application/json'}, body : JSON.stringify({maxVersion})})).json()
  console.log(res)
}

(function () {
  feather.replace({ 'aria-hidden': 'true' })
})()
