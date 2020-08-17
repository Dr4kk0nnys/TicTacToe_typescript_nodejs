"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const input = prompt_sync_1.default({ sigint: true });
class Main {
    constructor() {
        console.log('Hello World');
    }
    handleUserInput() {
        const userInput = input('Hi! ');
        console.log(`It is a pleasure to meet you ${userInput}`);
    }
}
const main = new Main();
main.handleUserInput();
//# sourceMappingURL=main.js.map