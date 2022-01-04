import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");

function main(currentTime) {
  if (gameOver) {
    if (confirm("You lost. Press ok to restart.")) {        
        window.location.reload();           // refresh page
    }
    return;     // terminate game
  }

  window.requestAnimationFrame(main); // game loop
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000; // convert to seconds
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return; // so update would be approximately 1 / snake speed

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";     // clear previous content
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
