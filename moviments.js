// moviments
const moviments = {
  up: 38,
  down: 40,
  right: 39,
  left: 37,
  keyPressed: 0,
};

// - Display - Who is playing now
const whichTurnItIsContent = (turn) => `Player ${turn} is now playing - `;

// Changing players turns
const turnChanger = (player, adversary) => {
  if (moviments.keyPressed < 3) {
    playerBorderColor(player);
  } else if (moviments.keyPressed === 3) {
    turn = adversary;
    playerBorderColor(player);
    $('.which-turn-it-is').text(whichTurnItIsContent(adversary));
    $('#skipTurn').prop('disabled', true );
    moviments.keyPressed = 0;
  }
};

// Function that changes player turn and also the grid border color
const playerTurnEngine = () => {

  if (moviments.keyPressed > 0 && moviments.keyPressed < 3 &&
    damageMultiplier.disableSkipButton === false) {

    $('#skipTurn').prop('disabled', false);
  } else {
    $('#skipTurn').prop('disabled', true );
  }

  switch (turn) {
    case player1.id:
      turnChanger(player1.id, player2.id);
      break;
    case player2.id:
      turnChanger(player2.id, player1.id);
    break;
  }
};

// Moving Up in the grid
const movingUp = (player, adversary) => {
  if (player.row > 0) {
    if (gameMap[player.row - 1][player.col] !== 1 &&
      playersMap[player.row - 1][player.col] !== adversary.gridId) {

      playersMap[player.row][player.col] = 0;
      player.row -= 1;
      playersMap[player.row][player.col] = player.gridId;
      moviments.keyPressed += 1;

      readyToFight();
      countingLife();
      player.backpackFunction(gameMap);
    } else {
      readyToFight();
    }
  }

  return moviments.keyPressed;
};

// Moving Down in the grid
const movingDown = (player, adversary) => {
  if (player.row < gameMap.length - 1) {
    if (gameMap[player.row + 1][player.col] !== 1 &&
    playersMap[player.row + 1][player.col] !== adversary.gridId) {

      playersMap[player.row][player.col] = 0;
      player.row += 1;
      playersMap[player.row][player.col] = player.gridId;
      moviments.keyPressed += 1;

      readyToFight();
      countingLife();
      player.backpackFunction(gameMap);
    } else {
      readyToFight();
    }
  }

  return moviments.keyPressed;
};

// Moving Left in the grid
const movingLeft = (player, adversary) => {
  if (player.col > 0) {
    if (gameMap[player.row][player.col - 1] !== 1 &&
    playersMap[player.row][player.col - 1] !== adversary.gridId) {

      playersMap[player.row][player.col] = 0;
      player.col -= 1;
      playersMap[player.row][player.col] = player.gridId;
      moviments.keyPressed += 1;

      readyToFight();
      countingLife();
      player.backpackFunction(gameMap);
    } else {
      readyToFight();
    }
  }

  return moviments.keyPressed;
};

// Moving Right in the grid
const movingRight = (player, adversary) => {
  if (player.col < gameMap[0].length - 1) {
    if (gameMap[player.row][player.col + 1] !== 1 &&
    playersMap[player.row][player.col + 1] !== adversary.gridId) {

      playersMap[player.row][player.col] = 0;
      player.col += 1;
      playersMap[player.row][player.col] = player.gridId;

      moviments.keyPressed += 1;
      readyToFight();
      countingLife();
      player.backpackFunction(gameMap);
    } else {
      readyToFight();
    }
  }

  return moviments.keyPressed;
};

// Key handler function
const keyHandler = (e) => {

  damageMultiplier.canAttack = false;
  attack.style.backgroundColor = 'white';
  defend.style.backgroundColor = 'white';

  if (e.keyCode === moviments.up || e.keyCode === moviments.down ||
     e.keyCode === moviments.right || e.keyCode === moviments.left) {
    switch (e.keyCode) {

      case moviments.up:
        switch (turn) {
          case player1.id:
            movingUp(player1, player2);
          break;
          case player2.id:
            movingUp(player2, player1);
            break;
        }
        break;

      case moviments.down:
      switch (turn) {
        case player1.id:
          movingDown(player1, player2);
        break;
        case player2.id:
          movingDown(player2, player1);
        break;
      }
      break;

      case moviments.left:
      switch (turn) {
        case player1.id:
          movingLeft(player1, player2);
        break;
        case player2.id:
          movingLeft(player2, player1);
        break;
      }
      break;

      case moviments.right:
      switch (turn) {
        case player1.id:
          movingRight(player1, player2);
        break;
        case player2.id:
          movingRight(player2, player1);
        break;
      }
      break;
    }

    playerTurnEngine();
    render();

  } else {
    readyToFight();
  }

};

// Button to walk less then 3 blocks
$('#skipTurn').prop('disabled', true );

const whichTurnItIsReproducer = (adversary) => {
  turn = adversary;
  playerBorderColor(adversary);
  $('.which-turn-it-is').text(`Player ${turn} is now playing`);
  moviments.keyPressed = 0;
  $('#skipTurn').prop('disabled', true );
};

$('#skipTurn').click(() => {
  switch (turn) {
    case player1.id:
      whichTurnItIsReproducer(player2.id);
      break;
    case player2.id:
      whichTurnItIsReproducer(player1.id);
      break;
  }
});

// Event listening for key press.
window.addEventListener('keydown', keyHandler, false);
