async function retryUntilValid(method, context) {
  try {
    return await method.call(context);
  } catch (error) {
    console.log(error.message);
    return retryUntilValid(method, context);
  }
}

export default retryUntilValid;
