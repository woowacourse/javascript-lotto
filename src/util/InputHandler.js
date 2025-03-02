import ERROR from "../constant/Error.js";
import Validator from "../domain/Validator.js";
import Output from "../view/Output.js";
import { throwError } from "./util.js";

async function getReadlineModule() {
  if (typeof window === "undefined") {
    const readline = await import("readline");
    return readline.default;
  } else {
    console.warn("현재 환경에서는 `readline`을 사용할 수 없습니다.");
    return null;
  }
}

export async function inputHandler({
  promptMessage,
  parser,
  validatorMethod,
  errorName,
}) {
  try {
    const userInput = await userInputEmptyHandler(promptMessage);
    const parsedUserInput = parser ? parser(userInput) : userInput;
    const parsedUserInputError = validatorMethod(parsedUserInput);
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
  Output.printErrorResults(userInputError, ERROR.USER_INPUT);
  throwError(userInputError);
  return userInput;
}

export async function readLineAsync(query) {
  return new Promise(async (resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error("arguments must be 1"));
    }

    if (typeof query !== "string") {
      reject(new Error("query must be string"));
    }

    const readline = await getReadlineModule(); // ✅ readline을 동적으로 import

    if (!readline) {
      reject(new Error("readline은 브라우저 환경에서 사용할 수 없습니다."));
      return;
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
