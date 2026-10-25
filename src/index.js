import './css/style.css';
import goblinImage from './img/goblin.png';
import GoblinGame from './js/GoblinGame';

const game = new GoblinGame(document.querySelector('.board'), goblinImage);
game.start();
