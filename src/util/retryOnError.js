const retryOnErrorForTerminal = async (asyncFn, onError) => {
  while (true) {
    try {
      return await asyncFn();
    } catch (e) {
      onError(e);
    }
  }
};

const retryOnErrorWeb = (asyncFn) => {
  try {
    return asyncFn();
  } catch (error) {
    alert(error);
  }
};

const isWebEnvironMent = typeof window !== "undefined";

const retryOnError = async (func, onError) => {
  if (isWebEnvironMent) {
    return retryOnErrorWeb(func);
  }
  return await retryOnErrorForTerminal(func, onError);
};

export default retryOnError;
