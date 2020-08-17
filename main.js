import PromptSync from 'prompt-sync';
const input = PromptSync({ sigint: true });
class Main {
    constructor() {
        this.board = new Array(9);
        this.populateFakeBoard();
        this.readGameBoard();
        console.log(this.board);
    }
    populateEmptyBoard() {
        this.board.fill(' ');
    }
    // testing / developing only
    populateFakeBoard() {
        const randomPossibilities = ['X', 'O'];
        for (let i = 0; i < this.board.length; i++) {
            const randomNumber = Math.floor(Math.random() * randomPossibilities.length);
            this.board[i] = randomPossibilities[randomNumber];
        }
    }
    readGameBoard() {
        let line = '';
        for (let i = 0; i < this.board.length; i++) {
            line += this.board[i] + ' | ';
            if ((i + 1) % 3 === 0) {
                console.log(line);
                line = '';
            }
        }
    }
    handleUserInput() {
    }
}
const main = new Main();
