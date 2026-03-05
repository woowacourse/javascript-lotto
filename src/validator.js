export const validateEmpty = (userInput) => {
  const trimmed = userInput.trim();
  if (trimmed === "") throw new Error("[ERROR]");
  return trimmed;
};
export const validateNumber = (userInput) => {
  if (Number.isNaN(userInput)) throw new Error("[ERROR]");
  if (!Number.isFinite(userInput)) throw new Error("[ERROR]");
  return userInput;
};
export const validateRange = (number) => {
  if (number > 45) throw new Error("[ERROR]");
  if (number < 1) throw new Error("[ERROR]");
  return number;
};
export const validateNoDuplicate = (numbers) => {
  if (numbers.length !== new Set(numbers).size) throw new Error("[ERROR]");
  return numbers;
};
export const validateCount = (numbers) => {
  if (numbers.length !== 6) throw new Error("[ERROR]");
  return numbers;
};
export const validatePositive = (number) => {
  if (number < 0) throw new Error("[ERROR]");
  return number;
};
export const validateUnit = (number) => {
  if (number % 1000 !== 0) throw new Error("[ERROR]");
  return number;
};
export const validateYesNo = (string) => {
  if (string !== "y" && string !== "n") throw new Error("[ERROR]");
};
export const validatePurchaseAmount = (number) => {
  const b = validateNumber(number);
  const c = validatePositive(b);
  const d = validateUnit(c);
  return d;
};
export const validateLottoNumbers = (numbers) => {
  const a = validateNoDuplicate(numbers);
  const b = validateCount(a);
  b.forEach((number) => {
    validateNumber(number);
    validateRange(number);
  });
  return numbers;
};
export const validateBonusNumber = (bonusNumber, winningNumbers) => {
  const a = validateNumber(bonusNumber);
  const b = validateRange(a);
  if (winningNumbers.includes(b)) throw new Error("[ERROR]");
  return bonusNumber;
};
export const validateRestartInput = (yn) => {
  const a = validateEmpty(yn);
  validateYesNo(a);
  return yn;
};
