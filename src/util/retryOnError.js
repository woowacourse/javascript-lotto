const retryOnErrorForTerminal = async (asyncFn, onError) => {
  while (true) {
    try {
      return await asyncFn();
    } catch (e) {
      onError(e);
    }
  }
};

const retryOnErrorWeb = async (asyncFn) => {
  try {
    return await asyncFn();
  } catch (error) {
    alert(error.message);
    await asyncFn();
  }
};

const isWebEnvironMent = typeof window !== "undefined";

const retryOnError = async (func, onError) => {
  if (isWebEnvironMent) {
    return await retryOnErrorWeb(func);
  }
  return await retryOnErrorForTerminal(func, onError);
};

export default retryOnError;
