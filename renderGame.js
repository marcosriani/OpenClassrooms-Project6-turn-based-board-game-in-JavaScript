class BuildMap {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.array = [];
  }

  generate2DArray () {
    for (let i = 0; i < this.row; i += 1) {
      this.array.push(
        new Array(this.col).fill(0).map(function () {
        return Math.floor(Math.random() *  1);
      }));
    }

    return this.array;
  }
}

// Players
class Players {
  constructor (id, gridId, defaultWeapon, lifePoints) {
    this.id = id;
    this.gridId = gridId;
    this.weapon = defaultWeapon;
    this.lifePoints = lifePoints;
    this.row = -1;
    this.col = -1;
  }

  // collect weapon when moving over it
  backpackFunction (map) {
    if (map[this.row][this.col] > 1) {
      let weaponITook = map[this.row][this.col];
      map[this.row][this.col] = this.weapon;
      this.weapon = weaponITook;
    }

    return this.weapon;
  }
}

const mapProperties = {
  goZones: 0,
  noGoZones: 1,
  size: 64,
  numberOfRows: 8,
  canWalk: 9,
};

// Game weapons
const weapons = {
  bird: {
    name: 'bird',
    id: 2,
    power: 10,
  },
  witch: {
    name: 'witch',
    id: 3,
    power: 30,
  },
  butterfly: {
    name: 'butterfly',
    id: 4,
    power: 40,
  },
  angel: {
    name: 'angel',
    id: 5,
    power: 50,
  },
};

// Instance of game map
const mapArray = new BuildMap(mapProperties.numberOfRows, mapProperties.numberOfRows);
const playerArray = new BuildMap(mapProperties.numberOfRows, mapProperties.numberOfRows);

// Instance of player 1 and player 2
const player1 = new Players(1, 6, 2, 100);
const player2 = new Players(2, 7, 2, 100);

const gameMap = mapArray.generate2DArray();
const playersMap = playerArray.generate2DArray();

// Random positions in the game array to insert the weapens
const randomPositionCol =  () => Math.floor(Math.random() * (gameMap.length));
const randomPositionRow =  () => Math.floor(Math.random() * (gameMap[0].length));

// Place randomly weapons on the map - choose the number of weapens
const randomLocation = (repeat, whichMap, item) => {
  for (let i = 0; i < repeat; i += 1) {
    whichMap[randomPositionCol()][randomPositionRow()] = item;
  }
};

// Random positions walkable, unwalkable blocks and also weapons
randomLocation((mapProperties.numberOfRows * mapProperties.numberOfRows) * 0.25, gameMap, 1);
randomLocation(1, gameMap, 2);
randomLocation(1, gameMap, 3);
randomLocation(1, gameMap, 4);
randomLocation(1, gameMap, 5);

// Render the game world
const render = () => {
  for (let i = 0; i < gameMap.length; i += 1) {
    for (let j = 0; j < gameMap[0].length; j += 1) {
      let gameCell = document.createElement('img');
      gameCell.setAttribute('class', 'gameCell');
      $('#worldMap').append(gameCell);

      switch (gameMap[i][j]) {
        case mapProperties.goZones:
          gameCell.src = '../images/square.png';
          gameCell.style.borderRadius = '4%';
          break;
        case mapProperties.noGoZones:
          gameCell.src = '../images/no-go.png';
          gameCell.style.borderRadius = '4%';
          break;
        case weapons.witch.id:
          gameCell.src = '../images/4.png';
          gameCell.setAttribute('id', 'weapon1');
          break;
        case weapons.butterfly.id:
          gameCell.src = '../images/1.png';
          gameCell.setAttribute('id', 'weapon2');
          break;
        case weapons.bird.id:
          gameCell.src = '../images/3.png';
          gameCell.setAttribute('id', 'weapon3');
          break;
        case weapons.angel.id:
          gameCell.src = '../images/2.png';
          gameCell.setAttribute('id', 'weapon4');
          break;
      }

      switch (playersMap[i][j]) {
        case player1.gridId:
          if (player1.weapon === weapons.bird.id) {
            gameCell.src = '../images/firstPlayer1.png';
          } else if (player1.weapon === weapons.witch.id) {
            gameCell.src = '../images/witchPlayer1.png';
          } else if (player1.weapon === weapons.butterfly.id) {
            gameCell.src = '../images/butterflyPlayer1.png';
          } else if (player1.weapon === weapons.angel.id) {
            gameCell.src = '../images/angelPlayer.png';
          }

          break;
        case player2.gridId:
          if (player2.weapon === weapons.bird.id)  {
            gameCell.src = '../images/firstPlayer2.png';
          } else if (player2.weapon === weapons.witch.id) {
            gameCell.src = '../images/witchPlayer2.png';
          } else if (player2.weapon === weapons.butterfly.id) {
            gameCell.src = '../images/butterflyPlayer2.png';
          } else if (player2.weapon === weapons.angel.id){
            gameCell.src = '../images/angelPlayer2.png';
          }

          break;
      }

      // Position the gameCell
      gameCell.style.top = i * mapProperties.size + 'px';
      gameCell.style.left = j * mapProperties.size + 'px';
    }
  }
};

// Random positioning player1
gameMap[randomPositionRow()][randomPositionRow()] = 6;

// Surrounds
const findingSurrounds = (whichMap, whichPlayer) => {
  const surroundRow  = [];
  const surroundCol  = [];

  for (let i = 0; i < gameMap.length; i += 1) {
    for (let j = 0; j < gameMap[0].length; j += 1) {
      if (whichMap[i][j] === whichPlayer) {

        // Above
        if (i > 0) {
          if (i - 1 !== undefined || j !== undefined) {
            surroundRow.push(i - 1);
            surroundCol.push(j);
          }
        }

        // Below
        if (i < gameMap.length - 1) {
          if (i + 1 !== undefined || j !== undefined) {
            surroundRow.push(i + 1);
            surroundCol.push(j);
          }
        }

        // On the left
        if (j > 0) {
          if (i !== undefined || j - 1 !== undefined) {
            surroundRow.push(i);
            surroundCol.push(j - 1);
          }
        }

        // On the right
        if (j < gameMap[0].length - 1) {
          if (i !== undefined || j + 1 !== undefined) {
            surroundRow.push(i);
            surroundCol.push(j + 1);
          }
        }

        // Same Place
        if (i !== undefined || j !== undefined) {
          surroundRow.push(i);
          surroundCol.push(j);
        }
      }
    }
  }

  const rowsAndCols = [];
  rowsAndCols.push(surroundRow);
  rowsAndCols.push(surroundCol);

  return rowsAndCols;
};

// Surrounds of player 1 when the game begin
const arraySurrounds = findingSurrounds(gameMap, player1.gridId);

const arrayRowsPlayer1 = arraySurrounds[0];
const arrayColsPlayer1 = arraySurrounds[1];

let randomColP2 =  randomPositionRow();
let randomRowP2 =  randomPositionCol();

for (let i = 0; i < arrayRowsPlayer1.length; i += 1) {
  while (randomColP2 === arrayRowsPlayer1 [i] || randomRowP2 === arrayColsPlayer1 [i]) {
    randomColP2 = randomPositionRow();
    randomRowP2 = randomPositionCol();
  }

  // Above left
  if ((randomColP2 - 1) !== undefined || arrayRowsPlayer1 [i - 1] !== undefined) {
    while ((randomColP2 - 1) === arrayRowsPlayer1[i] ||
     (randomColP2 - 1) === arrayRowsPlayer1[i] ||
     randomColP2 === arrayRowsPlayer1 [i] ||
     randomRowP2 === arrayColsPlayer1 [i]) {
      randomColP2 = randomPositionRow();
      randomRowP2 = randomPositionCol();
    }
  }

  // Above right
  if ((randomColP2 - 1) !== undefined || arrayRowsPlayer1 [i + 1] !== undefined) {
    while ((randomColP2 - 1) === arrayRowsPlayer1 [i] ||
    (randomColP2 + 1) === arrayRowsPlayer1 [i] ||
    randomColP2 === arrayRowsPlayer1 [i] ||
    randomRowP2 === arrayColsPlayer1 [i]) {
      randomColP2 = randomPositionRow();
      randomRowP2 = randomPositionCol();
    }
  }

  // Below right
  if ((randomColP2 + 1) !== undefined || arrayRowsPlayer1 [i + 1] !== undefined) {
    while ((randomColP2 + 1) === arrayRowsPlayer1 [i] ||
    (randomColP2 + 1) === arrayRowsPlayer1 [i] ||
    randomColP2 === arrayRowsPlayer1 [i] ||
    randomRowP2 === arrayColsPlayer1 [i]) {
      randomColP2 = randomPositionRow();
      randomRowP2 = randomPositionCol();
    }
  }

  // Below left
  if ((randomColP2 + 1) !== undefined || arrayRowsPlayer1 [i - 1] !== undefined) {
    while ((randomColP2 + 1) === arrayRowsPlayer1 [i] ||
    (randomColP2 - 1) === arrayRowsPlayer1 [i] ||
    randomColP2 === arrayRowsPlayer1 [i] ||
    randomRowP2 === arrayColsPlayer1 [i]) {
      randomColP2 = randomPositionRow();
      randomRowP2 = randomPositionCol();
    }
  }
}

// Random positioning player2
gameMap[randomColP2][randomRowP2] = 7;

// Making sure that the players always start at the walkable places.
for (let i = 0; i < gameMap.length; i += 1) {
  for (let j = 0; j < gameMap[0].length; j += 1) {
    if (gameMap[i][j] === player1.gridId) {
      playersMap[i][j] = player1.gridId;
      gameMap[i][j] = 0;
    }

    if (gameMap[i][j] === player2.gridId) {
      playersMap[i][j] = player2.gridId;
      gameMap[i][j] = 0;
    }

  }
}

// Players location when moving on the grid
for (let i = 0; i < gameMap.length; i += 1) {
  for (let j = 0; j < gameMap[0].length; j += 1) {
    if (playersMap[i][j] === player1.gridId) {
      player1.row = i;
      player1.col = j;
    }

    if (playersMap[i][j] === player2.gridId) {
      player2.row = i;
      player2.col = j;
    }
  }
}

// Indicates which player is playing
let turn = player1.id;

// Player border borderColor
const playerBorderColor = (whoIsPlaying) => {
  if (turn === player1.id) {
    $('#worldMap').css('border-color', 'rgba(255, 245, 0, 0.53)');
  } else if (turn === player2.id) {
    $('#worldMap').css('border-color', 'rgba(237, 100, 100, 0.74)');
  }
};

// damage multiplayer
const attacking = (damage, player, adversary) => {

  if (player1.lifePoints > 0 && player2.lifePoints > 0) {
      switch (player.weapon) {
        case weapons.bird.id:
          adversary.lifePoints -= 10 * damage;
          break;
        case weapons.witch.id:
          adversary.lifePoints -= 30 * damage;
          break;
        case weapons.butterfly.id:
          adversary.lifePoints -= 40 * damage;
          break;
        case weapons.angel.id:
          adversary.lifePoints -= 50 * damage;
          break;
      }
      if (adversary.lifePoints <= 0) {
        $('.steps-left').text(`Player ${adversary.id} Got Destroyed - Player ${player.id} Won`);
        damageMultiplier.playing = false;
        adversary.lifePoints = 0;
        turn = damageMultiplier.gameOver;
      }

      return adversary.lifePoints;
    }
};

$('.newGame').click(function() {
  location.reload();
});

$('.which-turn-it-is').text(`The Yellow Player ${turn} Starts - You can move the player from one to three boxes using the arrow keys`);

$('.life-points').text(`Life Points Player 1 (${player1.lifePoints})  -
Life Points Player 2 (${player2.lifePoints}) `);

render();
