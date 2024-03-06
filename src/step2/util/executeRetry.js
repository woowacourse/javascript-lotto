async function executeRetry(asyncFunc) {
  try {
    return await asyncFunc();
  } catch (error) {
    return alert(error.message);
  }
}

export default executeRetry;
