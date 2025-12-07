// Load leaderboard from JSON via AJAX (with graceful fallback)
const fallbackData = {
  scorers: [
    {rank:1, name:'Josef Bican', nationality:'AUT/CZE', career_goals:805},
    {rank:2, name:'Cristiano Ronaldo', nationality:'POR', career_goals:800},
    {rank:3, name:'Romário', nationality:'BRA', career_goals:772},
    {rank:4, name:'Lionel Messi', nationality:'ARG', career_goals:769},
    {rank:5, name:'Pelé', nationality:'BRA', career_goals:767},
    {rank:6, name:'Ferenc Puskás', nationality:'HUN', career_goals:746},
    {rank:7, name:'Gerd Müller', nationality:'GER', career_goals:735},
    {rank:8, name:'Ferenc Deák', nationality:'HUN', career_goals:576},
    {rank:9, name:'Uwe Seeler', nationality:'GER', career_goals:575},
    {rank:10, name:'Tulio Maravilha', nationality:'BRA', career_goals:575},
    {rank:11, name:'Zico', nationality:'BRA', career_goals:531},
    {rank:12, name:'Hugo Sánchez', nationality:'MEX', career_goals:516},
    {rank:13, name:'Jimmy Jones', nationality:'NIR', career_goals:517},
    {rank:14, name:'Imre Schlosser', nationality:'HUN', career_goals:511},
    {rank:15, name:'Robert Lewandowski', nationality:'POL', career_goals:500},
    {rank:16, name:'Zlatan Ibrahimović', nationality:'SWE', career_goals:560},
    {rank:17, name:'Eusébio', nationality:'POR', career_goals:623},
    {rank:18, name:'Luis Suárez', nationality:'URU', career_goals:500},
    {rank:19, name:'Romelu Lukaku', nationality:'BEL', career_goals:400},
    {rank:20, name:'Karim Benzema', nationality:'FRA', career_goals:430},
  ]
};

function renderTable(scorers){
  const tbody = document.querySelector('#leaderboard tbody');
  tbody.innerHTML = '';
  scorers.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.rank}</td><td>${row.name}</td><td>${row.nationality}</td><td>${row.career_goals}</td>`;
    tbody.appendChild(tr);
  });
}

async function loadData(){
  try{
    const res = await fetch('data/top_scorers.json');
    const json = await res.json();
    renderTable(json.scorers);
    window._allScorers = json.scorers;
  }catch(e){
    // fallback if local file fetch is blocked
    renderTable(fallbackData.scorers);
    window._allScorers = fallbackData.scorers;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadData();
  document.getElementById('btnFilter').addEventListener('click', () => {
    const q = document.getElementById('filterName').value.toLowerCase().trim();
    const f = (window._allScorers || []).filter(s => s.name.toLowerCase().includes(q));
    renderTable(f.length ? f : (window._allScorers || []));
  });
});