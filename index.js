/**
 * These are available Game Tools.
 * On each Play-Round, every player will permitted to select a tool of choice against their opponent.
 */
const tools = [ 'Rock', 'Paper', 'Scissors' ];

/**
 * 
 * @param {Integer} start 
 * @param {Integer} limit 
 * @returns {Integer} returns a randomized number in range of parameters :start & :limit
 */
const getIndex = (start=0, limit=tools.length) => {
  const min = Math.ceil(start);
  const max = Math.floor(limit);

  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 
 * @returns {String} returns the computer simulated game input/move.
 */
const getComputerChoice = () => tools[getIndex()];

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
    return `Tie!! ${playerMove} cannot be used against ${playerMove}.`
  } 
  else if (
    (playerMove === 'rock' && simulatedMove === 'scissors') ||
    (playerMove === 'scissors' && simulatedMove === 'paper') ||
    (playerMove === 'paper' && simulatedMove === 'rock')
  ) {
    return `You won! ${playerMove} beats ${simulatedMove}.`
  }
  else {
    return `Your lost! ${simulatedMove} beats ${playerMove}.`
  }
}
