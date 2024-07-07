let boxes = document.querySelectorAll(".box");
let resetGameButton = document.querySelector('#reset-game');
let newGameButton = document.querySelector('#new-game');
let messageContainer = document.querySelector('.message-container');
let message = document.querySelector('#message');

let turn0 = true; // playerO, playerX
let count = 0; // To count the number of clicks

const winnerPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7],
    [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            box.classList.add("o-color");
            turn0 = false;
        } else {
            box.innerText = "X";
            box.classList.add("x-color");
            turn0 = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
    });
});

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    messageContainer.classList.add("hide");
    messageContainer.classList.remove("show");
    newGameButton.style.display = "none"; // Hide new game button
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o-color", "x-color");
    }
};

const showWinner = (winner) => {
    message.innerText = `CONGRATULATIONS, WINNER IS ${winner}`;
    messageContainer.classList.remove("hide");
    messageContainer.classList.add("show");
    newGameButton.style.display = "block"; // Show new game button
    disableBoxes();
};

const showDraw = () => {
    message.innerText = "IT'S DRAW";
    messageContainer.classList.remove("hide");
    messageContainer.classList.add("show");
    newGameButton.style.display = "block"; // Show new game button
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winnerPatterns) {
        let postionValue1 = boxes[pattern[0]].innerText;
        let postionValue2 = boxes[pattern[1]].innerText;
        let postionValue3 = boxes[pattern[2]].innerText;

        if (postionValue1 != "" && postionValue2 != "" && postionValue3 != "") {
            if (postionValue1 === postionValue2 && postionValue2 === postionValue3) {
                showWinner(postionValue1);
                return;
            }
        }
    }
    if (count === 9) {
        showDraw();
    }
};

newGameButton.addEventListener("click", resetGame);
resetGameButton.addEventListener("click", resetGame);
