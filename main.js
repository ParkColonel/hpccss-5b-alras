// Wordle Game State
const wordleVocabulary = [
  'glide', 'sneak', 'quaff', 'slurp', 'gaunt', 'stern', 'azure', 'lilac', 'tryst', 'chide',
  'taunt', 'burst', 'crack', 'vital', 'revel', 'about', 'above', 'actor', 'admit', 'adult',
  'after', 'agent', 'agree', 'alert', 'alike', 'alive', 'allow', 'alone', 'along', 'alter',
  'among', 'amuse', 'anger', 'angle', 'apply', 'argue', 'arise', 'armed', 'array', 'asset',
  'audit', 'avoid', 'award', 'aware', 'basic', 'basis', 'begin', 'below', 'birth', 'block',
  'board', 'brain', 'brief', 'build', 'cause', 'chain', 'check', 'civil', 'claim', 'clean',
  'clear', 'clock', 'close', 'count', 'court', 'cover', 'cycle', 'daily', 'dance', 'dated',
  'delay', 'depth', 'draft', 'drive', 'event', 'exact', 'exist', 'extra', 'faith', 'field',
  'final', 'focus', 'force', 'front', 'grand', 'group', 'guide', 'heart', 'heavy', 'ideal',
  'image', 'index', 'input', 'issue', 'joint', 'large', 'layer', 'level', 'limit', 'local',
  'logic', 'major', 'match', 'model', 'music', 'night', 'order', 'other', 'phase', 'point',
  'power', 'price', 'prior', 'range', 'scope', 'share', 'small', 'sound', 'space', 'stage',
  'still', 'table', 'total', 'track', 'trend', 'trial', 'value', 'voice', 'waste', 'watch',
  'water', 'whole', 'world', 'yield'
];

const alrasSettings = {
  'EN ALRAS': {
    headerName: 'English',
    sectionName: 'English',
    description: `Available Features: <br>- Generic Vocabulary Flashcards <br>- Wordle <br>- Vocabulary Set Challenge`
  },
  'HIST ALRAS': {
    headerName: 'History',
    sectionName: 'History',
    description: `Available Features: <br>- Common Abbreviations <br>- Cold War Notes <br>- Hong Kong History Notes <br>- Japan History Notes`
  },
  'GEOG ALRAS': {
    headerName: 'Geography',
    sectionName: 'Geography',
    description: `Status: <br>- Geography section is coming soon. <br>- Please check back for upcoming materials and activities.`
  },
  'CHEM ALRAS': {
    headerName: 'Chemistry',
    sectionName: 'Chemistry',
    description: `Status: <br>- Chemistry section is coming soon. <br>- Please check back for upcoming materials and activities.`
  }
};

let currentAlras = 'EN ALRAS';
const screenIds = [
  'en-screen',
  'hist-screen',
  'geog-screen',
  'chem-screen',
  'flashcard-app',
  'geog-c1-app',
  'geog-c2-app',
  'geog-c3-app',
  'geog-c5-app',
  'geog-c6-app',
  'geog-c7-app',
  'geog-e1-app',
  'history-table-app',
  'cold-war-app',
  'hk-history-app',
  'jp-history-app',
  'update-logs-app',
  'set-challenge-app',
  'wordle-app'
];

const routeMap = {
  home: showLanding,
  flashcards: openFlashcards,
  abbreviations: openHistoryAbbreviations,
  'cold-war': openColdWarNotes,
  'hk-history': openHkHistoryNotes,
  'jp-history': openJpHistoryNotes,
  wordle: openWordle,
  challenge: openSetChallenge,
  updates: openUpdateLogs
};

function setRoute(route) {
  if (!route) return;
  if (window.location.hash !== `#${route}`) {
    history.replaceState(null, '', `#${route}`);
  }
}

function animateJump(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.classList.remove('jump-in');
  void el.offsetWidth;
  el.classList.add('jump-in');
}

function hideAllScreens() {
  screenIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
}

function openScreen(screenId, {
  route,
  heroDisplay = 'none',
  scroll = true
} = {}) {
  hideAllScreens();
  const hero = document.querySelector('.hero, .hero-grid');
  if (hero) hero.style.display = heroDisplay;
  const screen = document.getElementById(screenId);
  if (!screen) return;
  screen.classList.add('active');
  animateJump(screenId);
  if (scroll) {
    screen.scrollIntoView({ behavior: 'smooth' });
  }
  setRoute(route);
}

function openApp(appId) {
  const heroDisplay = appId === 'en-screen' ? 'grid' : 'none';
  openScreen(appId, { heroDisplay });
}

function switchSubject(screenId, headerTitle, buttonElement) {
  document.querySelectorAll('.alras-item').forEach((btn) => btn.classList.remove('active'));
  if (buttonElement) buttonElement.classList.add('active');
  const titleElement = document.getElementById('header-title');
  if (titleElement) titleElement.innerText = headerTitle;
  const heroDisplay = screenId === 'en-screen' ? 'grid' : 'none';
  openScreen(screenId, { heroDisplay });
}

function openRouteFromHash() {
  const routeKey = (window.location.hash || '#home').replace('#', '');
  const routeHandler = routeMap[routeKey] || showLanding;
  routeHandler();
}

function selectAlras(alras) {
  currentAlras = alras;
  const settings = alrasSettings[alras] || alrasSettings['EN ALRAS'];
  document.querySelector('header .brand h1').textContent = `HPCCSS 5B ${settings.headerName} ALRAS`;

  document.querySelectorAll('.alras-item').forEach((btn) => {
    btn.classList.toggle('active', btn.textContent.trim() === alras);
  });

  const updateLogText = document.querySelector('#update-logs-app .app-header p');
  if (updateLogText) {
    updateLogText.textContent = `View recent updates and improvements to ${alras}.`;
  }

  const wordleIntro = document.querySelector('#wordle-app .app-header p');
  if (wordleIntro) {
    wordleIntro.textContent = `Guess the five-letter vocabulary word in 6 attempts.`;
  }

  showLanding();
}

let wordleState = {
  currentWord: '',
  guesses: [],
  attempts: 6,
  gameOver: false,
  won: false,
  usedWords: [],
  remainingWords: [...wordleVocabulary]
};

const setChallengeSets = [
  { words: ['prevalent', 'ubiquitous', 'commonplace'], meaning: '普遍的' },
  { words: ['inevitable', 'irrefutable'], meaning: '不可避免的' },
  { words: ['heated / contentious debate', 'storms of controversies', 'avalanches of controversies'], meaning: '激烈的爭論' },
  { words: ['daunting', 'overwhelming', 'staggering', 'alarming', 'pressing', 'catastrophic', 'disheartening', 'formidable'], meaning: '令人生畏的' },
  { words: ['important', 'paramount', 'vital (to sth)', 'crucial (to sth)', 'critical (to sth)', 'integral (to sth)', 'indispensable (to sth)', 'pivotal', 'of paramount / crucial importance'], meaning: '重要的' },
  { words: ['reputation', 'Fame', 'Renown', 'Approval', 'Recognition'], meaning: '名聲' },
  { words: ['problems', 'repercussions', 'ramifications'], meaning: '後果' },
  { words: ['detrimental (to sth)', 'devastating (to sth)', 'distressing'], meaning: '有害的' },
  { words: ['worsens', 'aggravates', 'intensifies', 'exacerbates'], meaning: '加劇' },
  { words: ['fear', 'agitation', 'apprehension', 'anxiety', 'anger', 'hatred', 'hostility'], meaning: '恐懼與敵意' },
  { words: ['alleviates', 'ameliorates', 'remedies', 'eradicates', 'uproots'], meaning: '緩和 / 改善' },
  { words: ['study', 'delve into', 'dive into', 'probe into', 'sift through'], meaning: '深入研究' },
  { words: ['deals with', 'wrestles with', 'grapples with'], meaning: '處理 / 應對' }
];

const setChallengeState = {
  currentSet: null,
  displayedWord: '',
  remainingWords: [],
  attempts: 3,
  maxAttempts: 3
};

function normalizeSetAnswer(value) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startSetChallenge() {
  const setData = setChallengeSets[Math.floor(Math.random() * setChallengeSets.length)];
  const chosenIndex = Math.floor(Math.random() * setData.words.length);
  const chosenWord = setData.words[chosenIndex];
  const remainingWords = setData.words.filter((_, index) => index !== chosenIndex);

  setChallengeState.currentSet = setData;
  setChallengeState.displayedWord = chosenWord;
  setChallengeState.remainingWords = shuffleArray([...remainingWords]);
  setChallengeState.attempts = setChallengeState.maxAttempts;

  document.getElementById('set-challenge-newset').classList.add('hidden');
  renderSetChallenge();
}

function renderSetChallenge() {
  const state = setChallengeState;
  document.getElementById('set-challenge-meaning').textContent = state.currentSet.meaning;
  document.getElementById('set-challenge-word').textContent = state.displayedWord;
  document.getElementById('set-challenge-attempts').textContent = `Chances remaining: ${state.attempts}`;
  document.getElementById('set-challenge-status').textContent = 'Enter the rest of the synonym set below. The first two letters of each answer are shown.';

  const inputsHtml = state.remainingWords.map((word, index) => {
    const firstLetters = word.trim().slice(0, 2).toUpperCase();
    return `
      <div class="set-challenge-row">
        <label for="set-challenge-input-${index}">${index + 1}. ${firstLetters}...</label>
        <input type="text" id="set-challenge-input-${index}" class="set-challenge-input" autocomplete="off" />
      </div>
    `;
  }).join('');

  document.getElementById('set-challenge-inputs').innerHTML = inputsHtml;
  document.getElementById('set-challenge-submit').disabled = false;
}

function submitSetChallenge() {
  const state = setChallengeState;
  const answers = state.remainingWords.map((_, index) => normalizeSetAnswer(document.getElementById(`set-challenge-input-${index}`).value));
  const expected = state.remainingWords.map(word => normalizeSetAnswer(word));
  const allCorrect = answers.every((answer, index) => answer === expected[index]);

  if (allCorrect) {
    document.getElementById('set-challenge-status').textContent = '✅ Correct! You completed the set.';
    document.getElementById('set-challenge-newset').classList.remove('hidden');
    document.getElementById('set-challenge-submit').disabled = true;
    return;
  }

  state.attempts -= 1;
  document.getElementById('set-challenge-attempts').textContent = `Chances remaining: ${state.attempts}`;

  if (state.attempts <= 0) {
    document.getElementById('set-challenge-status').textContent = '❌ You failed. A new set has been selected.';
    document.getElementById('set-challenge-submit').disabled = true;
    setTimeout(startSetChallenge, 1000);
  } else {
    document.getElementById('set-challenge-status').textContent = `❌ Some answers are incorrect. Please try again. ${state.attempts} chance(s) left.`;
  }
}

function openSetChallenge() {
  openScreen('set-challenge-app', { route: 'challenge' });
  startSetChallenge();
}

function initializeWordle() {
  // Reset remaining words if all have been used
  if (wordleState.remainingWords.length === 0) {
    wordleState.remainingWords = [...wordleVocabulary];
  }
  
  // Pick a random word
  const randomIndex = Math.floor(Math.random() * wordleState.remainingWords.length);
  wordleState.currentWord = wordleState.remainingWords[randomIndex].toUpperCase();
  wordleState.usedWords.push(wordleState.currentWord);
  
  // Remove the word from remaining words
  wordleState.remainingWords.splice(randomIndex, 1);
  
  // Reset game state
  wordleState.guesses = [];
  wordleState.attempts = 6;
  wordleState.gameOver = false;
  wordleState.won = false;
  
  // Update display
  updateWordleDisplay();
  document.getElementById('guess-input').disabled = false;
  document.getElementById('guess-input').focus();
  document.getElementById('guess-input').value = '';
  document.getElementById('new-game-btn').style.display = 'none';
}

function updateWordleDisplay() {
  const letterCounts = {};
  for (let char of wordleState.currentWord) {
    letterCounts[char] = (letterCounts[char] || 0) + 1;
  }

  // Display word with revealed letters
  let display = '';
  for (let i = 0; i < wordleState.currentWord.length; i++) {
    let letter = wordleState.currentWord[i];
    let isRevealed = false;
    
    for (let guess of wordleState.guesses) {
      if (guess[i].letter === letter && guess[i].state === 'correct') {
        isRevealed = true;
        break;
      }
    }
    
    display += isRevealed ? letter : '_';
  }
  document.getElementById('word-display').textContent = display.split('').join(' ');

  // Display guesses
  let guessesList = '';
  for (let guess of wordleState.guesses) {
    let guessLine = '<div class="guess-line">';
    for (let letterObj of guess) {
      guessLine += `<span class="letter-box ${letterObj.state}">${letterObj.letter}</span>`;
    }
    guessLine += '</div>';
    guessesList += guessLine;
  }
  document.getElementById('guesses-list').innerHTML = guessesList;

  // Update attempts
  document.getElementById('attempts-text').textContent = `Attempts remaining: ${wordleState.attempts}`;

  // Update status
  let statusText = '';
  if (wordleState.won) {
    statusText = '<span class="status-win">🎉 You Won! The word was ' + wordleState.currentWord + '</span>';
  } else if (wordleState.gameOver) {
    statusText = '<span class="status-lose">Game Over! The word was ' + wordleState.currentWord + '</span>';
  }
  document.getElementById('wordle-status').innerHTML = statusText;
}

function handleGuessKeydown(event) {
  if (event.key === 'Enter') {
    submitGuess();
  }
}

function submitGuess() {
  if (wordleState.gameOver || wordleState.won) {
    document.getElementById('new-game-btn').style.display = 'block';
    return;
  }

  const input = document.getElementById('guess-input').value.toUpperCase();
  
  if (input.length !== 5) {
    alert('Please enter a 5-letter word');
    return;
  }

  const letterCounts = {};
  for (let char of wordleState.currentWord) {
    letterCounts[char] = (letterCounts[char] || 0) + 1;
  }

  // Evaluate the guess
  let guessArray = [];
  for (let i = 0; i < input.length; i++) {
    const letter = input[i];
    let state = 'absent';

    if (letter === wordleState.currentWord[i]) {
      state = 'correct';
      letterCounts[letter]--;
    } else if (wordleState.currentWord.includes(letter) && letterCounts[letter] > 0) {
      state = 'present';
      letterCounts[letter]--;
    }

    guessArray.push({ letter, state });
  }

  wordleState.guesses.push(guessArray);
  wordleState.attempts--;

  // Check if word is correct
  if (input === wordleState.currentWord) {
    wordleState.won = true;
    wordleState.gameOver = true;
  } else if (wordleState.attempts === 0) {
    wordleState.gameOver = true;
  }

  if (wordleState.gameOver || wordleState.won) {
    document.getElementById('new-game-btn').style.display = 'block';
    document.getElementById('guess-input').disabled = true;
  }

  updateWordleDisplay();
  document.getElementById('guess-input').value = '';
  document.getElementById('guess-input').focus();
}

function openWordle() {
  openScreen('wordle-app', { route: 'wordle' });
  initializeWordle();
  document.getElementById('guess-input').disabled = false;
}

function openHistoryAbbreviations() {
  openScreen('history-table-app', { route: 'abbreviations' });
}

function openColdWarNotes() {
  openScreen('cold-war-app', { route: 'cold-war' });
}

function openHkHistoryNotes() {
  openScreen('hk-history-app', { route: 'hk-history' });
}

function openJpHistoryNotes() {
  openScreen('jp-history-app', { route: 'jp-history' });
}

function showLanding() {
  document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
  hideAllScreens();
  const hero = document.querySelector('.hero, .hero-grid');
  if (hero) hero.style.display = 'grid';
  document.getElementById('en-screen')?.classList.add('active');
  const settings = alrasSettings[currentAlras] || alrasSettings['EN ALRAS'];
  document.querySelector('header .brand h1').textContent = `HPCCSS 5B ${settings.headerName} ALRAS`;
  animateJump('primary-feature-card');
  setRoute('home');
}

function openFlashcards() {
  openScreen('flashcard-app', { route: 'flashcards', heroDisplay: 'grid' });
  document.getElementById('loading').style.display = 'block';
  document.getElementById('app').style.display = 'none';
  renderCard();
}

function openUpdateLogs() {
  openScreen('update-logs-app', { route: 'updates' });
  document.querySelector('header .brand h1').textContent = 'HPCCSS 5B ALRAS Update Logs';
  document.querySelectorAll('.alras-item').forEach((btn) => btn.classList.remove('active'));
  document.getElementById('sidebar-update-logs').classList.add('active');
}

function openWebsiteUpdates() {
  openScreen('website-updates-app', { route: 'updates' });
  document.querySelector('header .brand h1').textContent = 'Website Updates';
  document.querySelectorAll('.alras-item').forEach((btn) => btn.classList.remove('active'));
}

window.addEventListener('load', () => {
  hideAllScreens();
  selectAlras(currentAlras);
  openRouteFromHash();
  if (typeof cards !== 'undefined' && cards.length === 0) {
    document.getElementById('loading').innerText = 'No data found.';
  }
});

// Explicitly expose functions to global scope for HTML onclick handlers
window.submitGuess = submitGuess;
window.submitSetChallenge = submitSetChallenge;
window.openWordle = openWordle;
window.openSetChallenge = openSetChallenge;

window.addEventListener('hashchange', openRouteFromHash);
