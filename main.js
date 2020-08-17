import PromptSync from 'prompt-sync';
const input = PromptSync({ sigint: true });
class Main {
    constructor() {
        this.board = new Array(9);
        this.populateFakeBoard();
        this.readGameBoard();
    }
    populateEmptyBoard() {
        this.board.fill(' ');
    }
    // testing / developing only
    populateFakeBoard() {
        const randomPossibilities = ['X', 'O'];
        for (let i = 0; i < this.board.length; i++) {
            this.board[i] = randomPossibilities[Math.floor(Math.random() * randomPossibilities.length)];
        }
    }
    readGameBoard() {
        for (let i = 0; i < 3; i++) {
            let line = '';
            for (let j = 0; j < 3; j++) {
                line += this.board[i + j] + ' | ';
            }
            console.log(line);
        }
    }
    handleUserInput() {
    }
}
const main = new Main();
