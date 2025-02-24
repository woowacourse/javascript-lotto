const retryAsync = async (func, onError) => {
  while (true) {
    try {
      return await func();
    } catch (error) {
      if (onError) {
        onError(error);
      } else {
        console.log(error.message);
      }
    }
  }
};

export default retryAsync;
