export const retryInput = async (callback) => {
  try {
    return await callback();
  } catch (error) {
    console.log(error.message);
    return retryInput(callback);
  }
};
