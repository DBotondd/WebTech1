// Form validation with inline errors and CSS updates
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const errors = [];

    function setError(id, msg){
      const input = document.getElementById(id);
      const small = input.closest('.form-row').querySelector('.error');
      small.textContent = msg || '';
      input.classList.toggle('invalid', !!msg);
      if(msg) errors.push(msg);
    }

    // Validate name
    const name = document.getElementById('name').value.trim();
    setError('name', name.length >= 3 ? '' : 'The name must be at least 3 characters.');

    // Validate email
    const email = document.getElementById('email').value.trim();
    setError('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Please enter a valid email address.');

    // Style radio/checkbox groups
    function groupError(selector, containerIndex, message){
      const container = form.querySelectorAll('.form-row')[containerIndex];
      const small = container.querySelector('.error');
      small.textContent = message || '';
      container.classList.toggle('invalid', !!message);
      if(message) errors.push(message);
    }

    // Radio required
    const style = form.querySelector('input[name="style"]:checked');
    groupError('input[name="style"]', 3, style ? '' : 'Choose a game style!');

    // At least one checkbox
    const topics = Array.from(form.querySelectorAll('input[name="topics"]:checked'));
    groupError('input[name="topics"]', 4, topics.length ? '' : 'Choose at least one topic!');

    // Message
    const message = document.getElementById('message').value.trim();
    const msgErr = message.length >= 10 ? '' : 'The message must be at least 10 characters';
    const msgSmall = document.getElementById('message').closest('.form-row').querySelector('.error');
    msgSmall.textContent = msgErr; if(msgErr) errors.push(msgErr);
    document.getElementById('message').classList.toggle('invalid', !!msgErr);

    if(errors.length === 0){
      alert('Thank you! The form has been successfully submitted.');
      form.reset();
    }
  });
});