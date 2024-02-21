async function retryUntilValid(method, context) {
  try {
    return await method.call(context);
  } catch (error) {
    console.log(error.message);
    return await retryUntilValid(method, context);
  }
}

export default retryUntilValid;
