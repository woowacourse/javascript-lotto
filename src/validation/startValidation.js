/**
 * Validation의 categories를 순회하며 유효성 검사를 하는 함수
 * @param {Object} categories 
 * @param {string | number | Object} input 
 */
function startValidation(categories, input) {
  Object.values(categories).forEach(({ errorMessage, isValid }) => {
    if (!isValid(input)) {
      throw new Error(errorMessage);
    }
  });
}

export default startValidation;
