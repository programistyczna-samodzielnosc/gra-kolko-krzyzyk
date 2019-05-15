function game() {
    let moveCounter = 0;
    let players = [
        {
            name: 'kolko'
        },
        {
            name: 'krzyzyk'
        }
    ];

    let board = [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
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
        if (isCellEmpty(event.target) && isTargetCorrect(event.target)) {
            event.target.classList.add(`board__cell--${currentPlayer.name}`);
            event.target.classList.remove(`board__cell--${opponentPlayer.name}`);
            moveCounter++;
            opponentPlayer = players[((Math.abs(moveCounter - 1)) % 2)];
            currentPlayer = players[(moveCounter % 2)];
            displayCurrentPlayer();
        }

        // updateBoard();
        // checkWin();
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