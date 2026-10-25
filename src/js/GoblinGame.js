const BOARD_SIZE = 4;
const MOVE_INTERVAL = 1000;

export default class GoblinGame {
  constructor(container, imageSource) {
    this.container = container;
    this.cells = [];
    this.currentPosition = -1;
    this.timer = null;

    for (let index = 0; index < BOARD_SIZE ** 2; index += 1) {
      const cell = document.createElement('div');
      cell.className = 'board__cell';
      this.cells.push(cell);
      this.container.append(cell);
    }

    this.goblin = document.createElement('img');
    this.goblin.className = 'board__goblin';
    this.goblin.src = imageSource;
    this.goblin.alt = 'Гоблин';
    this.goblin.draggable = false;
    this.move();
  }

  move() {
    const availableCells = this.currentPosition === -1 ? this.cells.length : this.cells.length - 1;
    let nextPosition = Math.floor(Math.random() * availableCells);

    // Пропускаем текущую ячейку: каждая из остальных имеет равный шанс.
    if (this.currentPosition !== -1 && nextPosition >= this.currentPosition) {
      nextPosition += 1;
    }

    // append переносит существующий img к новому родителю автоматически.
    this.cells[nextPosition].append(this.goblin);
    this.currentPosition = nextPosition;
  }

  start() {
    if (this.timer !== null) return;
    this.timer = setInterval(() => this.move(), MOVE_INTERVAL);
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
  }
}
