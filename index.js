const tools = [ 'Rock', 'Paper', 'Scissors' ];

const getIndex = (start=0, limit=tools.length) => {
  const min = Math.ceil(start);
  const max = Math.floor(limit);

  return Math.floor(Math.random() * (max - min) + min);
}

const getComputerChoice = () => tools[getIndex()];
