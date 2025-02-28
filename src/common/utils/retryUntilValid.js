const retryUntilValid = async (func, ...arg) => {
  try {
    return await func(...arg);
  } catch (error) {
    console.log(`${error.message}\n`);
    return retryUntilValid(func, ...arg);
  }
};

export default retryUntilValid;
