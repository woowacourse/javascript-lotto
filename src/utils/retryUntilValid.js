const retryUntilValid = async (getInputFunc, onError) => {
  while (true) {
    try {
      const input = await getInputFunc();
      return input;
    } catch (err) {
      await onError(err);
    }
  }
};

export default retryUntilValid;
