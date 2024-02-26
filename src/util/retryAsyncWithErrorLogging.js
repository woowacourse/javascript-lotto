function retryAsyncWithErrorLogging(asyncFunc, maxRetries = Infinity, retries = 0) {
  return asyncFunc().then(
    (result) => result,
    (error) => {
      console.log(error.message);
      if (retries < maxRetries) {
        return retryAsyncWithErrorLogging(asyncFunc, maxRetries, retries + 1);
      }
      throw new Error(error.message);
    }
  );
}

export default retryAsyncWithErrorLogging;
