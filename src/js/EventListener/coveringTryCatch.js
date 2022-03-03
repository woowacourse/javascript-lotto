import ValidationError from '../ValidationError/index.js';

const coveringTryCatch = (tryFunction, catchFunction) => {
  try {
    tryFunction();
  } catch (error) {
    if (error instanceof ValidationError) {
      alert(error.message);
      catchFunction(error.orderToView);
      return;
    }

    throw error;
  }
};

export default coveringTryCatch;
