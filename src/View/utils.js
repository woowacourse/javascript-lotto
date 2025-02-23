export const readUserInputUntilSuccess = async ({
  readUserInput,
  formatter,
  onError,
}) => {
  try {
    const input = await readUserInput();
    return formatter(input);
  } catch (error) {
    onError(error);
    return await readUserInputUntilSuccess({
      readUserInput,
      formatter,
      onError,
    });
  }
};

export const convertFormat = {
  splitByComma: (input) => input.split(','),
  toNumber: (input) => Number(input),
};
