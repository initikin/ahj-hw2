import GoblinGame from '../GoblinGame';

describe('Перемещение гоблина', () => {
  let container;
  let game;

  beforeEach(() => {
    jest.useFakeTimers();
    container = document.createElement('div');
    document.body.append(container);
  });

  afterEach(() => {
    game?.stop();
    document.body.replaceChildren();
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  test.each([0, 7, 15])('при загрузке создаёт поле 4×4 и гоблина в случайной ячейке %i', (position) => {
    jest.spyOn(Math, 'random').mockReturnValue((position + 0.5) / 16);
    game = new GoblinGame(container, 'goblin.png');

    expect(container.children).toHaveLength(16);
    expect(container.querySelectorAll('img')).toHaveLength(1);
    expect(container.children[position].firstElementChild).toBe(game.goblin);
    expect(game.goblin.getAttribute('src')).toBe('goblin.png');
  });

  test('каждую секунду перемещает тот же img в другую ячейку', () => {
    game = new GoblinGame(container, 'goblin.png');
    const goblin = game.goblin;
    const originalParent = goblin.parentElement;
    game.start();

    jest.advanceTimersByTime(999);
    expect(goblin.parentElement).toBe(originalParent);

    for (let step = 0; step < 100; step += 1) {
      const previousParent = goblin.parentElement;
      jest.advanceTimersByTime(step === 0 ? 1 : 1000);
      expect(goblin.parentElement).not.toBe(previousParent);
      expect(container.querySelectorAll('img')).toHaveLength(1);
      expect(container.querySelector('img')).toBe(goblin);
      expect(previousParent.children).toHaveLength(0);
    }
  });

  test('из каждой позиции доступны ровно 15 других ячеек', () => {
    const random = jest.spyOn(Math, 'random');

    for (let initial = 0; initial < 16; initial += 1) {
      const destinations = new Set();

      for (let choice = 0; choice < 15; choice += 1) {
        container.replaceChildren();
        random.mockReturnValueOnce((initial + 0.5) / 16);
        game = new GoblinGame(container, 'goblin.png');
        const previousParent = game.goblin.parentElement;
        random.mockReturnValueOnce(choice / 15);
        game.move();

        expect(game.goblin.parentElement).not.toBe(previousParent);
        expect(container.contains(game.goblin)).toBe(true);
        destinations.add(Array.from(container.children).indexOf(game.goblin.parentElement));
      }

      expect(destinations.size).toBe(15);
    }
  });

  test('повторный start не создаёт дополнительный таймер, stop останавливает перемещения', () => {
    game = new GoblinGame(container, 'goblin.png');
    const move = jest.spyOn(game, 'move');
    game.start();
    game.start();
    jest.advanceTimersByTime(1000);
    expect(move).toHaveBeenCalledTimes(1);

    game.stop();
    jest.advanceTimersByTime(5000);
    expect(move).toHaveBeenCalledTimes(1);

    game.start();
    jest.advanceTimersByTime(1000);
    expect(move).toHaveBeenCalledTimes(2);
  });
});
