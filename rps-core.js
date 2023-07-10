/**
 * These are available Game Tools.
 * On each Play-Round, every player will be permitted to select a tool of choice against the opposition.
 */
const GAME_TOOLS = [ 'rock', 'paper', 'scissors' ];

/**
 * Player possible win scenarios given a 3 size tools box
 */
const PLAYER_WIN_SCENARIOS = [
  'rock:scissors',
  'scissors:paper',
  'paper:rock'
];

/**
 * Contains the overall game results for each game participant
 */
const scoreBoard = {
  player: 0,
  opponent: 0,
  roundCounter: 0,
};

/**
 * Determines if the player is a winner of a play round based on predefined win scenarios
 * @param {String} playerSelection 
 * @param {String} simulationSelection 
 * @returns {Boolean}
 */
const hasPlayerWon = (playerSelection, simulationSelection) => (
  PLAYER_WIN_SCENARIOS.indexOf(`${playerSelection}:${simulationSelection}`) >= 0
);

/**
 * Generates a random number with respect to provided boundaries.
 * @param {Integer} start 
 * @param {Integer} limit 
 * @returns {Integer} returns a randomized number in range of parameters :start & :limit
 */
const getIndex = (start = 0, limit = GAME_TOOLS.length) => {
  const min = Math.ceil(start);
  const max = Math.floor(limit);

  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Simulates a computer input to the game.
 * @returns {String} returns the computer simulated game input/move.
 */
const getComputerChoice = () => GAME_TOOLS[getIndex()];

/**
 * Compiles the play round results and determines a fitting outcome.
 * @param {String} playerSelection user input that will be used to determine the fate of round.
 * @param {String} computerSelection computer/simulated input that will be used to determine the fate of round.
 */
function playRound() {
  let scoreUpdate;
  const playerMove = this.getAttribute('id').toLowerCase();
  const computerMove = getComputerChoice().toLowerCase();
  
  // Prevent player input from falling outside the accepted standards.
  // Fail player on cheating attempt.
  if (GAME_TOOLS.indexOf(playerMove) === -1) {
    scoreBoard = [ 0, 1, buildStatement(null, playerMove, computerMove) ];
  } else if (playerMove === computerMove) {
    scoreUpdate = [ 0, 0, buildStatement(2, playerMove, computerMove) ];
  } else if (hasPlayerWon(playerMove, computerMove)) {
    scoreUpdate = [ 1, 0, buildStatement(0, playerMove, computerMove) ];
  } else {
    scoreUpdate = [ 0, 1, buildStatement(1, playerMove, computerMove) ];
  }

  updateScoreBoard(...scoreUpdate);
  checkGameStatus();
}

/**
 * Builds a fitting statement given the play round results 
 * @param { Number? } index 
 * @param { String } playerSelection 
 * @param { String } computerSelection 
 * @returns 
 */
const buildStatement = (index, playerSelection, computerSelection) => {
  const prefixes = [ 'You Won!', 'You Lost!', 'Tie!' ];

  switch (index) {
    case 0:
      return `${prefixes[index]} ${playerSelection} beats ${computerSelection}`;
    case 1:
      return `${prefixes[index]} ${computerSelection} beats ${playerSelection}`;
    case 2:
      return `${prefixes[index]} ${playerSelection} can't be used against ${computerSelection}`;
    default:
      return `You lost! No cheating...${playerSelection} is forbidden`;
  }
};

/**
 * Updates game score board in real time
 * @param { Number } playerScore 
 * @param { Number } computerScore 
 * @param { String } statement
 */
const updateScoreBoard = (playerScore, computerScore, statement) => {
  scoreBoard.player += playerScore;
  scoreBoard.opponent += computerScore;
  scoreBoard.roundCounter++;

  document.querySelector('.player-score :last-child').textContent = scoreBoard.player;
  document.querySelector('.opponent-score :first-child').textContent = scoreBoard.opponent;
  document
    .getElementById('game-results')
    .append(createResulElement(statement, scoreBoard.roundCounter));
};

const createResulElement = (desc, index) => {
  const element = document.createElement('i');
  element.classList.add('game-result-round');
  element.textContent = `Round #${index}: ${desc}`;

  return element;
};

/**
 * Restart the game
 */
const restart = () => {
  scoreBoard.player = scoreBoard.opponent = 0;
  scoreBoard.roundResults = [];

  document.querySelector('.player-score :last-child').textContent = '0';
  document.querySelector('.opponent-score :first-child').textContent = '0';
  document.getElementById('game-results').innerHTML = '';
};

/**
 * Concludes the game and resets data
 * @param { String } recognition depicts the aftermath of the game towards the player.
 */
const finish = (recognition) => {
  alert(recognition);
  restart();
};

/**
 * Check game status after every play round
 * @returns 
 */
const checkGameStatus = () => {
  if (scoreBoard.player === 5) {
    return finish('Congratulations! You won the game...')
  }

  if (scoreBoard.opponent === 5) {
    return finish('Oops! You lost the game...')
  }
}
