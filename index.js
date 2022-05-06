console.log('funguju');

//Herní tahy - kolečka a křížky

let fields = document.querySelectorAll('.field__button');

let player = 'circle';
let winner;
const turn = (event) => {
  event.target.classList.add(`game__field--${player}`);
  event.target.disabled = true;
  if (isWinningMove(event.target) === true) {
    let confirmation = confirm(`Vyhrává ${winner}. Spustit novou hru?`);
    if (confirmation === true) {
      location.reload();
    }
  }
  if (player === 'circle') {
    player = 'cross';
    winner = 'křížek';
  } else {
    player = 'circle';
    winner = 'kolečko';
  }
  document.querySelector('.current-player').src = `obrazky/${player}.svg`;
};

for (let i = 0; i < fields.length; i += 1) {
  fields[i].addEventListener('click', turn);
}

//Výherní tahy
const boardSize = 10; // 10x10
const getField = (row, column) => {
  return fields[row * boardSize + column];
};

const getSymbol = (field) => {
  if (field.classList.contains('game__field--cross')) {
    return 'cross';
  }
  if (field.classList.contains('game__field--circle')) {
    return 'circle';
  }
};

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }
  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;
  let d;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  let inDiagonal = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva nahoru
  i = origin.column;
  d = origin.row;
  while (i > 0 && d > 0 && symbol === getSymbol(getField(d - 1, i - 1))) {
    inDiagonal++;
    i--;
    d--;
  }

  // Koukni doleva dolu
  i = origin.column;
  d = origin.row;
  while (
    i > 0 &&
    d < boardSize - 1 &&
    symbol === getSymbol(getField(d + 1, i - 1))
  ) {
    inDiagonal++;
    i--;
    d++;
  }

  // Koukni doprava nahoru
  i = origin.column;
  d = origin.row;
  while (
    i < boardSize - 1 &&
    d > 0 &&
    symbol === getSymbol(getField(d - 1, i + 1))
  ) {
    inDiagonal++;
    i++;
    d--;
  }

  // Koukni doprava dolu
  i = origin.column;
  d = origin.row;
  while (
    i < boardSize - 1 &&
    d < boardSize - 1 &&
    symbol === getSymbol(getField(d + 1, i + 1))
  ) {
    inDiagonal++;
    i++;
    d++;
  }

  if (inDiagonal >= symbolsToWin) {
    return true;
  }

  return false;
};
