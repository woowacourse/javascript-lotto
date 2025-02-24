export const readUserInputUntilSuccess = async ({
  readUserInput,
  formatter,
}) => {
  try {
    const input = await readUserInput();
    return formatter(input);
  } catch (error) {
    console.error(error.message);
    return await readUserInputUntilSuccess({
      readUserInput,
      formatter,
    });
  }
};

export const convertFormat = {
  splitByComma: (input) => input.split(','),
  toNumber: (input) => Number(input),
};
