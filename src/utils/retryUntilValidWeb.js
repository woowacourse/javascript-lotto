async function retryUntilValidWeb(method, context) {
  try {
    return await method.call(context);
  } catch (error) {
    alert(error.message);
    return retryUntilValidWeb(method, context);
  }
}

export default retryUntilValidWeb;
