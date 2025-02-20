import Validator from "../domain/Validator.js";
import Input from "../view/Input.js";
import Output from "../view/Output.js";
import Parser from "./Parser.js";
import { throwError } from "./util.js";
import readline from "readline";

export async function inputHandler({
  promptMessage,
  parser,
  validatorMethod,
  errorName,
}) {
  try {
    const userInput = await userInputEmptyHandler(promptMessage);
    const parsedUserInput = parser ? Parser[parser](userInput) : userInput;
    const parsedUserInputError = Validator[validatorMethod](parsedUserInput);
    Output.printErrorResults(parsedUserInputError, errorName);
    throwError(parsedUserInputError);
    return parsedUserInput;
  } catch (error) {
    return inputHandler({
      promptMessage,
      parser,
      validatorMethod,
      errorName,
    });
  }
}

async function userInputEmptyHandler(promptMessage) {
  const userInput = await readLineAsync(promptMessage);
  const userInputError = Validator.userInput(userInput);
  Output.printErrorResults(userInputError, "USER_INPUT");
  throwError(userInputError);
  return userInput;
}

export async function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error("arguments must be 1"));
    }

    if (typeof query !== "string") {
      reject(new Error("query must be string"));
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      resolve(input);
    });
  });
}
