export const inputErrorChecker = (validator) => {
  try {
    validator();
  } catch (error) {
    return { state: true, message: error.message };
  }

  return { state: false, message: '' };
};
