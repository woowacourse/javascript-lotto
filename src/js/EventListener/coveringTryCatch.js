import ValidationError from '../ValidationError/index.js';

const coveringTryCatch = (tryFunction) => {
  try {
    tryFunction();
  } catch (error) {
    if (error instanceof ValidationError) {
      error.handling();
      return;
    }

    throw error;
  }
};

export default coveringTryCatch;
