import Validator from "../domain/Validator.js";
import Input from "../view/Input.js";
import Output from "../view/Output.js";
import Parser from "./Parser.js";
import { throwError } from "./util.js";

export async function inputHandler({
  inputMethod,
  parser,
  validatorMethod,
  errorName,
}) {
  try {
    const userInput = await userInputEmptyHandler(inputMethod);
    const parsedUserInput = parser ? Parser[parser](userInput) : userInput;
    const parsedUserInputError = Validator[validatorMethod](parsedUserInput);
    Output.printErrorResults(parsedUserInputError, errorName);
    throwError(parsedUserInputError);
    return parsedUserInput;
  } catch (error) {
    return inputHandler({
      inputMethod,
      parser,
      validatorMethod,
      errorName,
    });
  }
}

async function userInputEmptyHandler(inputMethod) {
  const userInput = await Input[inputMethod]();
  const userInputError = Validator.userInput(userInput);
  Output.printErrorResults(userInputError, "USER_INPUT");
  throwError(userInputError);
  return userInput;
}
