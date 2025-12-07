// Simple football guessing game
const QUESTIONS = [
  {
    q: 'Who holds the record for most international goals?',
    options: ['Cristiano Ronaldo', 'Ali Daei', 'Lionel Messi', 'Pelé'],
    answer: 0
  },
  {
    q: 'Which country won the 2018 World Cup?',
    options: ['Germany', 'Croatia', 'France', 'Brazil'],
    answer: 2
  },
  {
    q: 'Who wore the number 10 shirt and won the World Cup in 1986?',
    options: ['Maradona', 'Zico', 'Platini', 'Van Basten'],
    answer: 0
  }
];

let current = 0, score = 0;

function renderQuestion(){
  const q = QUESTIONS[current];
  document.getElementById('question').textContent = q.q;
  const opts = document.getElementById('options');
  opts.innerHTML='';
  q.options.forEach((txt, i) => {
    const btn = document.createElement('button');
    btn.textContent = txt;
    btn.addEventListener('click', () => choose(i));
    opts.appendChild(btn);
  });
  document.getElementById('result').textContent = '';
}

function choose(i){
  const q = QUESTIONS[current];
  const res = document.getElementById('result');
  if(i === q.answer){
    score++; res.textContent = 'Correct! ✅';
    res.style.color = '#84f7b7';
  }else{
    res.textContent = 'Incorrect! ❌';
    res.style.color = '#ffb4b4';
  }
  // jQuery effect
  $('#result').stop(true,true).css({opacity:0}).animate({opacity:1}, 400);
  Array.from(document.querySelectorAll('#options button')).forEach(b => b.disabled = true);
}

document.addEventListener('DOMContentLoaded', () => {
  renderQuestion();
  document.getElementById('next').addEventListener('click', () => {
    current++;
    if(current >= QUESTIONS.length){
      document.getElementById('question').textContent = `Your final score: ${score}/${QUESTIONS.length}`;
      document.getElementById('options').innerHTML = '';
      document.getElementById('next').disabled = true;
    }else{
      renderQuestion();
    }
  });
});