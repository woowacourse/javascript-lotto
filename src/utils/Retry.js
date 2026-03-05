const retry = async (action) => {
  try {
    return await action();
  } catch (error) {
    console.log(error.message + "\n");
    return await retry(action);
  }
};

export default retry;
