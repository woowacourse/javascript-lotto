import { retryInput } from "../utils/retryInput.js";
import { readLineAsync } from "./input.js";

export default async function handleUserInput(message, validateFn) {
  return await retryInput(async () => {
    const input = await readLineAsync(message);
    validateFn(input);
    return input;
  });
}
