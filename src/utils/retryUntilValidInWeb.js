const retryUntilValidInWeb = async (func, ...arg) => {
  try {
    return await func(...arg);
  } catch (error) {
    return retryUntilValidInWeb(func, ...arg);
  }
};

export default retryUntilValidInWeb;
