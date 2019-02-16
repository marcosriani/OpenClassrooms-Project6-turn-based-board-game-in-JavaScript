// damage multiplier
const damageMultiplier = {
  playing: true,
  damage: 1,
  defended: false,
  gameOver: 3,
  canAttack: false,
  disableSkipButton: false,
};

const countingLife = () => $('.life-points').text(`Life Points Player 1 (${player1.lifePoints})  -
  Life Points Player 2 (${player2.lifePoints}) `);

// Fight function
const readyToFight = () => {
  surrounds = findingSurrounds(playersMap, player1.gridId);
  damageMultiplier.disableSkipButton = false;

  for (let i = 0; i < surrounds[0].length; i += 1) {
    if (playersMap[surrounds[0][i]][surrounds[1][i]] === player2.gridId) {
      $('#attack').css('background-color', 'red');
      $('#defend').css('background-color', 'green');
      damageMultiplier.canAttack = true;
      damageMultiplier.disableSkipButton = true;
    }
  }

  return damageMultiplier.canAttack;
};

$('#attack').click(() => {

  if (damageMultiplier.canAttack === true) {

    if (damageMultiplier.playing) {

      switch (turn) {
        case player1.id:
          attacking(damageMultiplier.damage, player1, player2);
          break;
        case player2.id:
          attacking(damageMultiplier.damage, player2, player1);
        break;
      }

      countingLife();

      if (turn === player1.id) {
        turn = player2.id;
        playerBorderColor(player2.id);
      } else if (turn === player2.id) {
        turn = player1.id;
        playerBorderColor(player1.id);
      }

      $('.which-turn-it-is').text(`Player ${turn} is now playing - `);
    }

    if (turn === damageMultiplier.gameOver) {
      $('.which-turn-it-is').text('Game Over');
      $('#attack').prop('disabled', true );
      $('#defend').prop('disabled', true );
      $('#attack').css('background-color', 'white');
      $('#defend').css('background-color', 'white');
    }
  }

  damageMultiplier.defended = false;

  if (damageMultiplier.defended === false) {
    damageMultiplier.damage = 1;
  }

});

// Defending against the next next attack, reduzing 50% of the damages.
$('#defend').click(() => {
  if (damageMultiplier.canAttack === true) {
    damageMultiplier.defended = true;

    if (damageMultiplier.playing) {
      damageMultiplier.damage = 0.5;

      if (turn === player1.id) {
        turn = player2.id;
        playerBorderColor(player2.id);
      } else if (turn === player2.id) {
        turn = player1.id;
        playerBorderColor(player1.id);
      }

      $('.which-turn-it-is').text(`Player ${turn} is now playing - `);

    }
  }
});
