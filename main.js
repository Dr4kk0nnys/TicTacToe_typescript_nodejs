import PromptSync from 'prompt-sync';
const input = PromptSync({ sigint: true });
class Main {
    constructor() {
        console.log('Hello World');
    }
    handleUserInput() {
        const userInput = input('Hi! u good ? ');
        console.log(`It is a pleasure to meet you ${userInput}`);
    }
}
const main = new Main();
main.handleUserInput();
