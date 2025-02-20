import { retryInput } from '../utils/retryInput.js';
import { readLineAsync } from './input.js';

export default async function handleUserInput(message, validateFn, extraValue = null) {
  return await retryInput(async () => {
    const input = await readLineAsync(message);
    if (extraValue) {
      validateFn(input, extraValue);
      return input;
    }

    validateFn(input);
    return input;
  });
}
