import PromptSync from 'prompt-sync';
const input = PromptSync({ sigint: true });


class Main {
    // board is an array with fixed 9 index
    board = new Array<string>(9);

    constructor() {
        // this.populateFakeBoard(); // Testing only

        this.populateEmptyBoard();
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

    /*
        * Handle user input gets the user input
        * handle's it ( sanitize it ), and return the sanitized input
        * which is the position the user want's to put a 'X' on the board
        * 
        * It also makes the user give the right input
    */
    handleUserInput(): number {
        const userInput = input('[1 ~ 9]: ');

        // validating the user input
        if (/^\$+d/.test(userInput)) { // if the userInput is a number
            const sanitizedUserInput: number = (+userInput) + 1;
            /*
                * Lots of things to cover
                *
                * +userInput -> parsing a string to number
                * of course the user has to type a number for the index
                * of the position in the board, they want to play in
                * but that's not the job of the getting input part
                * that's the job of the validation part
                * 
                * + 1 -> the array is index 0. But in the real game
                * the index is 1 ~ 9, not 0 ~ 8. In order to fix that
                * we can simply add 1 to the userInput, transforming
                * it 1 ~ 9 index.
            */

            // valid index play
            if (sanitizedUserInput >= 1 && sanitizedUserInput <= 9) {
                return sanitizedUserInput;
            }
        }
    }
}

const main = new Main();

// TODO: Add at the handle user input, 'error' feedback ( if the user gives a wrong input, display an error message, and aks again for the input )
// TODO: At the start, ask if it's a multiplayer game, or a sole game
// TODO: If it's a solo game, display an input asking for the difficulty
// TODO: Work on the solo game functionality
// TODO: Work on the multiplayer game functionality ( x and o )