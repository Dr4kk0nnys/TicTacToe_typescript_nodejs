import PromptSync from 'prompt-sync';
const input = PromptSync({ sigint: true });
class Main {
    constructor() {
        // this.populateFakeBoard(); // Testing only
        // board is an array with fixed 9 index
        this.board = new Array(9);
        this.populateEmptyBoard();
        this.readGameBoard();
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
                /*
                    * This crazy logic of the loop makes a lot of sense
                    * It's easy to understand:
                    * since arrays are index 0, we need to start our
                    * i variable as value 0. But in order to populate
                    * all three indexes of each line in only one loop
                    * the third index ( 2 ) must be somehow divisible by three
                    * but 2 isn't directly divisible by 3. Unless summed with 1
                    *
                    * This whole logic could've been simplified by using two loops
                    * But what's the fun of that ? And also, it would've been slower
                */
                console.log(line);
                line = '';
            }
        }
    }
    handleUserInput() {
    }
}
const main = new Main();
