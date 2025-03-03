const validateWithAlert = (input, validateFunc) => {
  try {
    const validatedInput = validateFunc(input);
    return validatedInput;
  } catch (err) {
    alert(err.message);
  }
};

export default validateWithAlert;
