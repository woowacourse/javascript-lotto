const retryUntilValidWithAlert = async (func, ...arg) => {
  try {
    return await func(...arg);
  } catch (error) {
    alert(`${error.message}\n`);
    return retryUntilValidWithAlert(func, ...arg);
  }
};

export default retryUntilValidWithAlert;
