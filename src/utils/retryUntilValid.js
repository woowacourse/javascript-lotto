async function retryUntilValid(method) {
  try {
    return await method.call();
  } catch (error) {
    console.log(error.message);
    return retryUntilValid(method);
  }
}

export default retryUntilValid;
