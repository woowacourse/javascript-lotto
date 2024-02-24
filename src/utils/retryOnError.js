export const retryOnError = async (callback, ...args) => {
  while (true) {
    try {
      return await callback(...args);
    } catch (error) {
      console.log(error.message);
    }
  }
};
