// Basic video controls via JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('matchVideo');
  const btnPlay = document.getElementById('btnPlay');
  const btnPause = document.getElementById('btnPause');
  const btnMute = document.getElementById('btnMute');
  const scrub = document.getElementById('scrub');

  if(!video) return;

  btnPlay.addEventListener('click', () => video.play());
  btnPause.addEventListener('click', () => video.pause());
  btnMute.addEventListener('click', () => video.muted = !video.muted);

  // Scrubber
  video.addEventListener('timeupdate', () => {
    const p = (video.currentTime / (video.duration || 1)) * 100;
    scrub.value = p;
  });
  scrub.addEventListener('input', () => {
    video.currentTime = (scrub.value/100) * (video.duration || 0);
  });
});