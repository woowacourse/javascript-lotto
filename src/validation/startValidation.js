/**
 * Validation의 categories를 순회하며 유효성 검사를 하는 함수
 */
function startValidation(categories, input) {
  Object.keys(categories).forEach((key) => {
    const validation = categories[key];
    const valid = validation.isValid(input);
    if (!valid) {
      throw new Error(validation.errorMessage);
    }
  });
}

export default startValidation;
