const retryUntilValidWithAlert = async (func, ...arg) => {
  try {
    return await func(...arg);
  } catch (error) {
    return retryUntilValidWithAlert(func, ...arg);
  }
};

export default retryUntilValidWithAlert;
