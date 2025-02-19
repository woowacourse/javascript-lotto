const retryUntilValid = async (func, ...arg) => {
  while (true) {
    try {
      return await func(...arg);
    } catch (error) {
      console.log(`${error.message}\n`);
    }
  }
};

export default retryUntilValid;
