import { validateEmptySpace } from './Validation/inputView.js';

export const readUserInputUntilSuccess = async ({
  readUserInput,
  validation,
  formatter,
}) => {
  try {
    const input = await readUserInput();
    validateEmptySpace(input);

    const formattedInput = formatter(input);
    validation(formattedInput);

    return formattedInput;
  } catch (error) {
    console.error(error.message);
    return readUserInputUntilSuccess({ readUserInput, validation, formatter });
  }
};

export const convertFormat = {
  splitByComma: (input) => input.split(','),
  toNumber: (input) => Number(input),
};
