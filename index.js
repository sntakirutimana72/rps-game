document
  .getElementById('toggle-rules')
  .addEventListener('click', function () {
    const arrow = this.lastElementChild;
    const rulesContent = document.getElementById('rules-content');

    if (arrow.classList.contains('down')) {
      arrow.classList.remove('down');
      arrow.classList.add('up');
      rulesContent.style.display = 'none';
    } else {
      arrow.classList.remove('up');
      arrow.classList.add('down');
      rulesContent.style.display = 'block';
    }
  });

document.querySelectorAll('.game-selection').forEach(element => {
  element.addEventListener('click', playRound);
});

document.getElementById('game-reset').addEventListener('click', restart);
