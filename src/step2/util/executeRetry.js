function executeRetry(asyncFunc) {
  try {
    return asyncFunc();
  } catch (error) {
    alert(error.message);
    return executeRetry(asyncFunc);
  }
}

export default executeRetry;
