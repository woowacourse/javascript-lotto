export const checkReplay = async (input, fn) => {
  if (input === 'y') {
    await fn();
  }
};
