console.log('funguju');

let field = document.querySelectorAll('button');

let player = 'circle';
const turn = (event) => {
  event.target.classList.add(`game__field--${player}`);
  event.target.disabled = true;
  if (player === 'circle') {
    player = 'cross';
  } else {
    player = 'circle';
  }
  document.querySelector('.current-player').src = `/obrazky/${player}.svg`;
};

for (let i = 0; i < field.length; i += 1) {
  field[i].addEventListener('click', turn);
}
