import ERROR_MESSAGE from '../settings/ErrorMessage.js';

export function checkUserRetry(userInput) {
  if (userInput.toLowerCase() !== 'y' && userInput.toLowerCase() !== 'n')
    throw new Error(`${ERROR_MESSAGE.invalidCommand}`);
  return userInput;
}
