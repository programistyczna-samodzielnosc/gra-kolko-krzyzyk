function game() {
    let moveCounter = 0;
    let finish = false;
    let players = [
        {
            name: 'kolko'
        },
        {
            name: 'krzyzyk'
        }
    ];

    let win = [
        //kombinacje poziome
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        //kombinacje pionowe
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        //kombinacje ukosne
        [0, 4, 8],
        [2, 4, 6]
    ]

    let currentPlayer = players[0];
    let opponentPlayer = players[1];

    displayCurrentPlayer();

    let elementBoard = document.querySelector('.board');

    elementBoard.addEventListener('click', move)

    function displayCurrentPlayer() {
        let status = document.querySelector('.status');
        status.innerText = `Bieżący gracz: ${currentPlayer.name}`;
    }

    function move(event) {
        if (!finish && isCellEmpty(event.target) && isTargetCorrect(event.target)) {
            event.target.classList.add(`board__cell--${currentPlayer.name}`);
            event.target.classList.remove(`board__cell--${opponentPlayer.name}`);
            if (checkWin()) {
                document.querySelector('.result').innerText = 'wygrana!'
                finish = true;
                return;
            }
            if(moveCounter===8) {
                document.querySelector('.result').innerText = 'remis!'
            }
            moveCounter++;
            opponentPlayer = players[((Math.abs(moveCounter - 1)) % 2)];
            currentPlayer = players[(moveCounter % 2)];
            displayCurrentPlayer();
        }


    }

    function checkWin() {
        if (moveCounter < 4) {
            return console.log('nocheck yet');
        }

        let cells = Array.from(document.querySelectorAll('.board__cell'))
            .map(cell => {
                if (isTargetKolko(cell)) return {
                    name: 'kolko'
                }
                if (isTargetKrzyzyk(cell)) return {
                    name: 'krzyzyk'
                }
                return {
                    name: undefined
                }
            });

        let symbol = currentPlayer.name;
        let possibleWins = win.map(function (triple) {
            return tripleIsTheSame(triple, cells, symbol);
        })
        return possibleWins.includes(true);
    }

    function tripleIsTheSame(triple, cells, symbol) {
        for (let i = 0; i < triple.length; i++) {
            if (cells[triple[i]].name !== symbol) return false;
        }
        return true;
    }

    function isTargetCorrect(target) {
        return target.classList.contains("board__cell");
    }

    function isTargetKrzyzyk(target) {
        return target.classList.contains("board__cell--krzyzyk");
    }

    function isTargetKolko(target) {
        return target.classList.contains("board__cell--kolko");
    }

    function isCellEmpty(target) {
        return !isTargetKolko(target) && !isTargetKrzyzyk(target);
    }
}

window.onload = game;