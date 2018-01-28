/* GHOST MOVEMENT
  FROM MY FIRST PROJECT: DYNA BLASTER GAME (a bit refined)
  ----------------------------------  */

const ghostMovement = () => {

    const ghostEatsPlayer = () =>{

        if ($('.player').length === 0) {
            return false;
        } else {
            const playerX = $('.player').position().left;
                  playerY = $('.player').position().top,
                  playerSize = parseInt($('.player').css('width')),
                  monstah = $('.ghost');

            monstah.each( function(index) {
                const ghostX = $(this).position().left,
                      ghostY = $(this).position().top,
                      ghostSize = parseInt($(this).css('width'));

                if (ghostX < playerX + playerSize &&
                    ghostX + ghostSize > playerX &&
                    ghostY < playerY + playerSize &&
                    ghostY + ghostSize > playerY)
                {
                    $('.player').fadeOut(400);
                }
            });
        }
    }

    // checks if ghost eats player
    const ghostPlayerTicker = setInterval(function () {
        ghostEatsPlayer();
    }, 100);

    const ghostSize = parseInt($('.ghost').css('width')),
          blockSize = parseInt($('.wall').css('width')),
          ghostDiv = $('.ghost');

    // brick positions for ghosts
    const obj2Pos = [];

    $('.block').each(function(index) {
        const x = Math.round($(this).position().left),
              y = Math.round($(this).position().top);
        obj2Pos.push([x, y]);
    });

    // make bomb block ghost pathway
    $(document).on('keydown', function(event) {
        if (event.which == 32) {
            event.preventDefault();

            setTimeout(function () {
                const bX = Math.round($('.bomb')
                    .position().left),
                      bY = Math.round($('.bomb')
                    .position().top);

                obj2Pos.push([bX, bY]);
            }, 100);

            setTimeout(function () {
                obj2Pos =[];
                $('.block').each( function(index) {
                    const x = $(this).position().left,
                          y = $(this).position().top;
                    obj2Pos.push([x, y]);
                });
            }, 2850);
        }
    });

    // checking ghost collisions with obstacles
    const checkCollRight = (ghost) => {
        const gX = ghost.position().left,
              gY = ghost.position().top;

        for (let i = 0; i < obj2Pos.length; i++){
            if (gX + ghostSize + 4 >= obj2Pos[i][0] &&
                gX < obj2Pos[i][0] &&
                gY + ghostSize + 1 >= obj2Pos[i][1] &&
                gY - 1 <= obj2Pos[i][1] + blockSize ||
                gX + ghostSize >= 516)
            {
                return true;
            }
        }
    }

    const checkCollLeft = (ghost) => {
        const gX = ghost.position().left,
              gY = ghost.position().top;

        for (let i = 0; i < obj2Pos.length; i++){
            if (gX - 3 <= obj2Pos[i][0] + blockSize &&
                gX + ghostSize > obj2Pos[i][0] &&
                gY + ghostSize + 1 >= obj2Pos[i][1] &&
                gY - 1 <= obj2Pos[i][1] + blockSize
                || gX <= 4)
            {
                return true;
            }
        }
    }

    const checkCollUp = (ghost) => {
        const gX = ghost.position().left,
              gY = ghost.position().top;

        for (let i = 0; i < obj2Pos.length; i++){
            if (gY - 4 <= obj2Pos[i][1] + blockSize &&
                gY + ghostSize > obj2Pos[i][1] &&
                gX + ghostSize >= obj2Pos[i][0] &&
                gX <= obj2Pos[i][0] + blockSize
                || gY <= 4)
            {
                return true;
            }
        }
    }

    const checkCollDown = (ghost) => {
        const gX = ghost.position().left,
              gY = ghost.position().top;

        for (let i = 0; i < obj2Pos.length; i++){
            if (gY + ghostSize + 4 >= obj2Pos[i][1] &&
                gY < obj2Pos[i][1] &&
                gX + ghostSize >= obj2Pos[i][0] &&
                gX <= obj2Pos[i][0] + blockSize
                || gY + ghostSize >= 516)
            {
                return true;
            }
        }
    }
    // ghost moving function
    const moveGhost = (dirX, dirY, ghost) => {
        let gX = ghost.position().left;
        let gY = ghost.position().top;
        gX += dirX * 2;
        gY += dirY * 2;
        ghost.css({'left': gX });
        ghost.css({'top' : gY });
    }

    // ghost 'AI' - pathfinding
    $('.ghost').each(function(index) {
        const thisGhost = $(this),
              direction = {
                right : false,
                left  : false,
                up    : false,
                down  : false
              }

        const time = setInterval(function () {
            // if no collision, move
            if (direction.right && !checkCollRight(thisGhost)){
                moveGhost(1, 0, thisGhost);
            } else if (direction.left && !checkCollLeft(thisGhost)){
                moveGhost(-1, 0, thisGhost);
            } else if (direction.up && !checkCollUp(thisGhost)){
                moveGhost(0, -1, thisGhost);
            } else if (direction.down && !checkCollDown(thisGhost)){
                moveGhost(0, 1, thisGhost);
            // no taken direction condition
            } else {
                const possibleDir = ['right','up','down','left'];
                // delete direction from array if collision  detected
                if (checkCollRight(thisGhost)) {
                    for (let i = 0; i < possibleDir.length; i++) {
                        if (possibleDir[i] === 'right'){
                            possibleDir.splice(i, 1);
                            direction.right = false;
                        }
                    }
                }
                if (checkCollLeft(thisGhost)) {
                    for (let i = 0; i < possibleDir.length; i++) {
                        if (possibleDir[i] === 'left'){
                            possibleDir.splice(i, 1);
                            direction.left = false;
                        }
                    }
                }
                if (checkCollUp(thisGhost)) {
                    for (let i = 0; i < possibleDir.length; i++) {
                        if (possibleDir[i] === 'up'){
                            possibleDir.splice(i, 1);
                            direction.up = false;
                        }
                    }
                }
                if (checkCollDown(thisGhost)) {
                    for (let i = 0; i < possibleDir.length; i++) {
                        if (possibleDir[i] === 'down'){
                            possibleDir.splice(i, 1);
                            direction.down = false;
                        }
                    }
                }
                const newDir = Math.round(
                    Math.random() * (possibleDir.length - 1)
                );
                switch(possibleDir[newDir]) {
                    case 'left':
                    direction.left = true;
                    break;
                    case 'right':
                    direction.right = true;
                    break;
                    case 'up':
                    direction.up = true;
                    break;
                    case 'down':
                    direction.down = true;
                    break;
                }
            }
        }, 50);
    });
}

module.exports = ghostMovement;
