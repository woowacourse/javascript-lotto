import handleIO from './handleIO.js';

const readInput = async (callback) => {
  try {
    const result = await callback();
    return result;
  } catch (error) {
    handleIO.print(error.message);
    readInput(callback);
  }
};

export default readInput;
