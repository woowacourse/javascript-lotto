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
export const validateNoDuplicate = (lottoNumbers) => {
  if (lottoNumbers.length !== new Set(lottoNumbers).size)
    throw new Error("[ERROR]");
  return lottoNumbers;
};
export const validateCount = (lottoNumbers) => {
  if (lottoNumbers.length !== 6) throw new Error("[ERROR]");
  return lottoNumbers;
};
export const validatePositive = (number) => {
  if (number < 0) throw new Error("[ERROR]");
  return number;
};
export const validateUnit = (purchaseAmount) => {
  if (purchaseAmount % 1000 !== 0) throw new Error("[ERROR]");
  return purchaseAmount;
};
export const validateYesNo = (string) => {
  if (string !== "y" && string !== "n") throw new Error("[ERROR]");
};

export const validatePurchaseAmount = (number) => {
  validateNumber(number);
  validatePositive(number);
  validateUnit(number);
  return number;
};
export const validateLottoNumbers = (lottoNumbers) => {
  validateNoDuplicate(lottoNumbers);
  validateCount(lottoNumbers);
  lottoNumbers.forEach((lottoNumber) => {
    validateNumber(lottoNumber);
    validateRange(lottoNumber);
  });
  return lottoNumbers;
};
export const validateBonusNumber = (bonusNumber, winningNumbers) => {
  validateNumber(bonusNumber);
  validateRange(bonusNumber);
  if (winningNumbers.includes(bonusNumber)) throw new Error("[ERROR]");
  return bonusNumber;
};
export const validateRestartInput = (yn) => {
  validateEmpty(yn);
  validateYesNo(yn);
  return yn;
};
