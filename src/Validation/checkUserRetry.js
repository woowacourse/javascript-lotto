import ERROR_MESSAGE from '../constants/ErrorMessage.js';

export default function checkUserRetry(userInput) {
  if (userInput.toLowerCase() !== 'y' && userInput.toLowerCase() !== 'n')
    throw new Error(`${ERROR_MESSAGE.invalidCommand}`);
  return userInput;
}
