function isAlive(cell, neighbors) {
  if (neighbors === 3) {
    return 1;
  }
  if (Boolean(cell) && neighbors === 2) {
    return 1;
  }
  return 0;
}

const generate = (x) => {

  return new Array(x*x).fill(0);
};

const add = (...args) => args.reduce((accumulator, current) => accumulator + (current || 0), 0);

const countNeighbors = (cells, index) => {
  const width = Math.sqrt(cells.length);
  return add(
    cells[index - width],
    cells[index + width],
    index % width ? cells[index - 1] : 0,
    index % width ? cells[index - width - 1] : 0,
    index % width ? cells[index + width - 1] : 0,
    (index + 1) % width ? cells[index + 1] : 0,
    (index + 1) % width ? cells[index - width + 1] : 0,
    (index + 1) % width ? cells[index + width + 1] : 0,
  ) 
};

const regenerate = (cells) => {
  return cells.map((cell, index) => isAlive(cell, countNeighbors(cells, index)));
;}

const drawGrid = (cells) => {
  const width = Math.sqrt(cells.length)
  const grid = document.getElementById('grid');
  const container = document.createElement("div");
  container.className = "container";
  let row
  cells.forEach((singleCell, index) => {
    if (index % width === 0) {
      row = document.createElement('row');
      row.className = "row"
      container.appendChild(row)
    }
    const cellEl = document.createElement("div");
    cellEl.className = `cell ${singleCell === 0 ? 'dead': 'alive'}`;
    row.appendChild(cellEl);
  });
  grid.innerHTML = "";
  grid.appendChild(container);
};

const attachGridEventHandler = () => {
  document.getElementById('grid').addEventListener('click', event => {
    const className = event.target.className
    event.target.className = className.includes('dead')
      ? className.replace('dead', 'alive')
      : className.replace('alive', 'dead');
  });
};

const getCellsFromDom = () => {
  return Array.from(document.querySelectorAll('.cell'))
    .map(cell => cell.className.includes('dead') ? 0 : 1)
}

let gameLoop;

const start = () => {
  console.log("start")
  let generation = game.getCellsFromDom();
  gameLoop = setInterval(() => {
    generation = game.regenerate(generation);
    game.drawGrid(generation);
  }, 500);
};

const stop = () => {
  console.log("stop")
  clearInterval(gameLoop);
}

window.game = {
  isAlive,
  generate,
  regenerate,
  countNeighbors, 
  drawGrid,
  attachGridEventHandler,
  getCellsFromDom,
  start,
  stop
};
