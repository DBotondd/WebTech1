
async function getJSON(url){
  try{ const res = await fetch(url); return await res.json(); }
  catch(e){ return null; }
}
function createResultItem(title, href, subtitle){
  const a = document.createElement('a');
  a.className = 'result-item';
  a.href = href;
  a.innerHTML = `<strong>${title}</strong>${subtitle ? `<span>${subtitle}</span>` : ''}`;
  return a;
}
async function doSearch(qRaw){
  const q = (qRaw || '').trim().toLowerCase();
  const box = document.getElementById('searchResults');
  box.innerHTML = '';
  if(!q){ box.textContent = 'Type in a word.'; return; }
  const pages = (await getJSON('data/site_index.json'))?.pages || [];
  const pageHits = pages.filter(p => p.title.toLowerCase().includes(q) || (p.keywords||[]).some(k => k.toLowerCase().includes(q)));
  const players = (await getJSON('data/top_scorers.json'))?.scorers || [];
  const playerHits = players.filter(p => (p.name||'').toLowerCase().includes(q));
  if(pageHits.length === 0 && playerHits.length === 0){ box.textContent = 'No matches.'; return; }
  if(pageHits.length){
    const h = document.createElement('h3'); h.textContent = 'Pages'; box.appendChild(h);
    pageHits.forEach(p => box.appendChild(createResultItem(p.title, p.href, (p.keywords||[]).slice(0,3).join(', '))));
  }
  if(playerHits.length){
    const h2 = document.createElement('h3'); h2.textContent = 'Players'; box.appendChild(h2);
    playerHits.forEach(pl => box.appendChild(createResultItem(pl.name, `players.html?q=${encodeURIComponent(pl.name)}`, `Goals: ${pl.career_goals}`)));
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  const btn = document.getElementById('searchBtn');
  if(!input || !btn) return;
  btn.addEventListener('click', () => doSearch(input.value));
  input.addEventListener('keydown', (e) => { if(e.key === 'Enter'){ doSearch(input.value); }});
});
