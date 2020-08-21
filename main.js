import PromptSync from 'prompt-sync';
const input = PromptSync({ sigint: true });
class Main {
    constructor() {
        // this.populateFakeBoard(); // Testing only
        this.board = new Array(9);
        this.populateEmptyBoard();
        this.gameLoop();
    }
    gameLoop() {
        while (true) {
            this.board[this.AI()] = 'O';
            this.readGameBoard();
            const gameLogic = this.gameLogic();
            if (gameLogic.gameShouldEnd) {
                if (!gameLogic.draw)
                    console.log(`Player ${gameLogic.player.player} WON!`);
                else
                    console.log('DRAW!!');
                break;
            }
            this.board[this.handleUserInput()] = 'X';
        }
    }
    populateEmptyBoard() { this.board.fill(' '); }
    ;
    // testing/developing only
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
                console.log('___________');
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
    handleUserInput() {
        /*
            * I have to use an arrow function here, because
            * inside a normal function, this.board.length returns undefined
            * After reading for a while, I found this:
            * https://stackoverflow.com/questions/56844015/class-variable-undefined-inside-function
            * Gotta love js man, gotta love it.
        */
        const validateUserInput = (userInput) => {
            /*
                * If the user's input is correct, it returns an object
                    * { isValidated: true, sanitizedUserInput }
                * otherwise, it returns { isValidated: false }
            */
            if (/^\d+$/.test(userInput)) {
                const sanitizedUserInput = (+userInput) - 1;
                /*
                    * Lots of things to cover
                    *
                    * +userInput -> parsing a string to number
                    * of course the user has to type a number for the index
                    * of the position in the board, they want to play in
                    * but that's not the job of the getting input part
                    * that's the job of the validation part
                    *
                    * - 1 -> the array is index 0. But in the real game
                    * the index is 1 ~ 9, not 0 ~ 8. In order to fix that
                    * we can simply remove 1 to the userInput, transforming
                    * it 1 ~ 9 index. ( you type 1 ( the first index ), but the game
                    * understands it as 0 ( the first index ))
                */
                if (!this.isPositionAvailable(sanitizedUserInput))
                    return { isValidated: false };
                if (sanitizedUserInput >= 0 && sanitizedUserInput <= 8) {
                    return { isValidated: true, sanitizedUserInput };
                }
            }
            return { isValidated: false };
        };
        const userInput = input('[1 ~ 9]: ');
        const validation = validateUserInput(userInput);
        if (validation.isValidated) {
            return validation.sanitizedUserInput;
        }
        else {
            return handleIncorrectUserInput();
        }
        function handleIncorrectUserInput() {
            while (true) {
                console.log('Incorrect Input! It must be a number, with 1 ~ 9 index! Try again.');
                const newUserInput = input('[1 ~ 9]: ');
                const newValidation = validateUserInput(newUserInput);
                if (newValidation.isValidated)
                    return newValidation.sanitizedUserInput;
            }
        }
    }
    isPositionAvailable(position) {
        return (this.board[position] == ' ' ? true : false);
    }
    /*
        * The AI ( Definitely not an AI, just don't know what to call it )
        * Looks for a random spot to place
        * in the future, this will be way better
        * For now, it's just an empty feature
    */
    AI() {
        /*
            * I have to use an arrow function here, because
            * inside a normal function, this.board.length returns undefined
            * After reading for a while, I found this:
            * https://stackoverflow.com/questions/56844015/class-variable-undefined-inside-function
            * Gotta love js man, gotta love it.
        */
        const getRandomNumber = () => Math.floor(Math.random() * this.board.length);
        let randomNumber = getRandomNumber();
        while (true) {
            if (this.isPositionAvailable(randomNumber))
                return randomNumber;
            randomNumber = getRandomNumber();
        }
    }
    gameLogic() {
        const player1 = { player: 'X', score: 0 };
        const player2 = { player: 'O', score: 0 };
        /*
            * Logic to see if one of the players won
            * Note: This is the horizontal version
            * [0, 1, 2], [3, 4, 5], [6, 7, 8]
        */
        for (let i = 0; i < this.board.length; i++) {
            this.board[i] === 'X' ? player1.score++ : this.board[i] === 'O' ? player2.score++ : null;
            // every other line
            if ((i + 1) % 3 === 0) {
                if (player1.score === 3)
                    return { gameShouldEnd: true, player: player1, draw: false };
                if (player2.score === 3)
                    return { gameShouldEnd: true, player: player2, draw: false };
                player1.score = 0;
                player2.score = 0;
            }
        }
        /*
            * Logic to see if one of the players won
            * Note: This is the vertical version
            * [0, 3, 6], [1, 4, 7], [2, 5, 8]
        */
        for (let i = 0, j = 0; i < this.board.length; i++) {
            this.board[j] === 'X' ? player1.score++ : this.board[j] === 'O' ? player2.score++ : null;
            if ((i + 1) % 3 === 0) {
                if (player1.score === 3)
                    return { gameShouldEnd: true, player: player1, draw: false };
                if (player2.score === 3)
                    return { gameShouldEnd: true, player: player2, draw: false };
                player1.score = 0;
                player2.score = 0;
                j -= 5;
                continue;
            }
            j += 3;
            /*
                * Explanation about the 'j' variable
                *
                * If you look closely, you will realize that the coefficient of
                * the vertical line is 3. Meaning we need to sum the 'i' value with 3
                * every iteration, and somehow reset it when the number of loop iterations is
                * divisible by three. Although I didn't used the 'i' variable, I used the same
                * logic described.
                *
                * j += 3 ->
                * 'j' is summed with the coefficient of each loop iteration, allowing it
                * to search for each vertical line, ( made done the following sequence ):
                * 1 ) [0]     2) [1]      3) [2]
                *     [3]        [4]         [5]
                *     [6]        [7]         [6]
                *
                * j -= 5 ->
                * 'j' is subtracted by five, since it's the coefficient of the difference
                * between the last number of each column by the first one of the next column
                * 6 ( the last number of the first row  ) - 1 ( the first number of the second row ) = 5
                * 7 ( the last number of the second row ) - 2 ( the first number of the third row  ) = 5
                *
                * This logic not only allow us to only use one loop ( code is prettier )
                * It also allow us to do a quick overview of the code and understand it as a whole
            */
        }
        /*
            * Logic to see if one of the players won
            * Note: This is the diagonal version
            * [0, 4, 8], [2, 4, 6]
            *
            * WORST PART OF THE CODE, >>> WORKING ON IT <<<
            * IT IS UGLY, I KNOW
        */
        for (let i = 0; i < this.board.length; i += 4) {
            this.board[i] === 'X' ? player1.score++ : this.board[i] === 'O' ? player2.score++ : null;
            if (player1.score === 3)
                return { gameShouldEnd: true, player: player1, draw: false };
            if (player2.score === 3)
                return { gameShouldEnd: true, player: player2, draw: false };
        }
        player1.score = 0;
        player2.score = 0;
        for (let i = 2; i < (this.board.length - 1); i += 2) {
            this.board[i] === 'X' ? player1.score++ : this.board[i] === 'O' ? player2.score++ : null;
            if (player1.score === 3)
                return { gameShouldEnd: true, player: player1, draw: false };
            if (player2.score === 3)
                return { gameShouldEnd: true, player: player2, draw: false };
        }
        // checking if there is no empty spaces
        if (!this.board.some(element => element === ' '))
            return { gameShouldEnd: true, draw: true };
        return { gameShouldEnd: false, draw: false };
    }
}
new Main();
// TODO: At the start, ask if it's a multiplayer game, or a sole game
// TODO: If it's a solo game, display an input asking for the difficulty
// TODO: Work on the solo game functionality
// TODO: Work on the multiplayer game functionality ( x and o )
// TODO: To implement single player and multi player functionality, create a SinglePlayer class, and extend it from the main class, and only do the SinglePlayer code functionality
