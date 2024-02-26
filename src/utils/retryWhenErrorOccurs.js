async function retryWhenErrorOccurs(callback, ...args) {
  try {
    return await callback(...args);
  } catch (error) {
    console.log(error.message);
    return retryWhenErrorOccurs(callback, ...args);
  }
}

export default retryWhenErrorOccurs;
