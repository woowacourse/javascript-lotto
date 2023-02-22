export const inputErrorChecker = (validator) => {
  try {
    validator();
  } catch (error) {
    return { state: true, message: error };
  }

  return { state: false, message: '' };
};
