import PromptSync from 'prompt-sync';
const input = PromptSync({ sigint: true });


class Main {
    board = new Array<string>(9);

    constructor() {
        this.populateFakeBoard();
        this.readGameBoard();
    }

    populateEmptyBoard(): void {
        this.board.fill(' ');
    }

    // testing / developing only
    populateFakeBoard(): void {
        const randomPossibilities = ['X', 'O'];
        for (let i = 0; i < this.board.length; i++) {
            const randomNumber = Math.floor(Math.random() * randomPossibilities.length);
            this.board[i] = randomPossibilities[randomNumber];
        }
    }

    readGameBoard(): void {
        for (let i = 0; i < 3; i++) {
            let line = '';

            for (let j = 0; j < 3; j++) {
                line += this.board[i + j] + ' | ';
            }

            console.log(line);
        }
    }

    handleUserInput(): void {
    }
}

const main = new Main();
