'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currentScorePl1 = document.getElementById('current--0');
const currentScorePl2 = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let gameOn = true;

score0El.textContent = 0;
score1El.textContent = 0;
diceEL.classList.add('hidden');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // toggle makes sure that one class gets hidden, when the other gets activated.
  // Player 0 looses active, while player 1 gets it
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (gameOn) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (gameOn) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 30) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      gameOn = false;
      diceEL.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  gameOn = true;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScorePl1.textContent = 0;
  currentScorePl2.textContent = 0;
  console.log(scores[0]);
  player0El.classList.contains('player--winner')
    ? player0El.classList.remove('player--winner')
    : player1El.classList.remove('player--winner');

  diceEL.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  console.log(scores);
});
