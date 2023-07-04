/**
 * These are available Game Tools.
 * On each Play-Round, every player will permitted to select a tool of choice against their opponent.
 */
const GAME_TOOLS = [ 'Rock', 'Paper', 'Scissors' ];

/**
 * Player possible win scenarios given a 3 size tools box
 */
const PLAYER_WIN_SCENARIOS = [
  'rock:scissors',
  'scissors:paper',
  'paper:rock'
];

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
 * 
 * @param {Integer} start 
 * @param {Integer} limit 
 * @returns {Integer} returns a randomized number in range of parameters :start & :limit
 */
const getIndex = (start=0, limit=GAME_TOOLS.length) => {
  const min = Math.ceil(start);
  const max = Math.floor(limit);

  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 
 * @returns {String} returns the computer simulated game input/move.
 */
const getComputerChoice = () => GAME_TOOLS[getIndex()];

/**
 * 
 * @param {String} playerSelection user input that will be used to determine the fate of round.
 * @param {String} computerSelection computer/simulated input that will be used to determine the fate of round.
 * @returns {String} A declaration statement of the outcome of the play round
 */
const playRound = (playerSelection, computerSelection) => {
  const playerMove = playerSelection.toLowerCase();
  const simulatedMove = computerSelection.toLowerCase();

  if (playerMove === simulatedMove) {
    return `Tie!! ${playerMove} cannot be used against ${playerMove}`
  }
  return (
    hasPlayerWon(playerMove, simulatedMove) 
    ? `You won! ${playerMove} beats ${simulatedMove}`
    : `You lost! ${simulatedMove} beats ${playerMove}`
  )
}

/**
 * A play ground where each play round results are consolidated and compiled at the end of the game to 
 * determine the fate of the entire game.
 */
const game = () => {
  const scoreBoard = {
    player: 0,
    computer: 0
  }

  for (let j = 1; j < 6; j++) {
    const playerSelection = prompt(`Select Your Tool: (Available are [ ${GAME_TOOLS.join(' | ')} ]) `);
    const outcome = playRound(playerSelection, getComputerChoice());

    if (outcome.startsWith('You won!')) {
      scoreBoard.player++
    } else if (outcome.startsWith('You lost!')) {
      scoreBoard.computer++
    }

    console.log(`Round #${j}: `, outcome);
  }

  if (scoreBoard.player > scoreBoard.computer) {
    console.log(`You Won!`)
  } else if (scoreBoard.player < scoreBoard.computer) {
    console.log(`You Lost!`)
  } else {
    console.log(`Tie Game!`)
  }
}
