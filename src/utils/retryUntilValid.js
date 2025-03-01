const retryUntilValid = async (func, onError) => {
  while (true) {
    try {
      return await func();
    } catch (e) {
      onError(e);
    }
  }
};

export default retryUntilValid;
