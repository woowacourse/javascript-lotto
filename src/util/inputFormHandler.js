import Validator from "../domain/Validator.js";
import WebOutput from "../view/WebOutput.js";
import { throwError } from "./util.js";

export function inputFormHandler({
  inputValue,
  parser,
  validatorMethod,
  errorName,
}) {
  try {
    if (typeof inputValue === "string") userInputEmptyHandler(inputValue);
    const parsedUserInput = parser ? parser(inputValue) : inputValue;
    const parsedUserInputError = validatorMethod(parsedUserInput);
    WebOutput.printErrorResults(parsedUserInputError, errorName);
    throwError(parsedUserInputError);
    return parsedUserInput;
  } catch (error) {
    throw new Error(error);
  }
}

function userInputEmptyHandler(inputValue) {
  try {
    const userInputError = Validator.userInput(inputValue);
    throwError(userInputError);
  } catch (error) {
    throw new Error(error);
  }
}
