function showLanding() {
  document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
  document.getElementById('flashcard-app').style.display = 'none';
}

function openFlashcards() {
  document.getElementById('flashcard-app').style.display = 'block';
  document.getElementById('loading').style.display = 'block';
  document.getElementById('app').style.display = 'none';
  renderCard();
  document.getElementById('flashcard-app').scrollIntoView({ behavior: 'smooth' });
}

window.addEventListener('load', () => {
  document.getElementById('flashcard-app').style.display = 'none';
  if (typeof cards !== 'undefined' && cards.length === 0) {
    document.getElementById('loading').innerText = 'No data found.';
  }
});
