document.addEventListener('DOMContentLoaded', async function (e) {
  getTachiExport();
});

async function getTachiExport() {
  let maxVersion = 6;
  const json = await (
    await fetch('/api/me/tachiExport', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ maxVersion }),
    })
  ).json();
  const link = document.getElementById('exportLink');
  link.setAttribute(
    'href',
    `data:text/plain;charset=utf-8, ${encodeURIComponent(JSON.stringify(json))}`
  );
  link.setAttribute('download', `SCORES.json`);
}

(function () {
  feather.replace({ 'aria-hidden': 'true' });
})();
