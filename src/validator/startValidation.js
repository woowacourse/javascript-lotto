import AppError from '../errors/AppError/AppError.js';

/**
 * @param {object} validationTypes - 유효성 검사를 검사할 객체
 * @param {unknown} value - 입력 값
 * @throws {AppError}
 */
export const startValidation = (validationTypes, value) => {
  Object.values(validationTypes).forEach(({ errorMessage, isValid }) => {
    if (!isValid(value)) throw new AppError(errorMessage);
  });
};
