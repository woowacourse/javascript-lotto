import { LOTTO_INTO } from "../constants";

export const validateEmpty = (userInput) => {
  const trimmed = userInput.trim();
  if (trimmed === "") throw new Error("[ERROR] 빈 값이 입력되었습니다.");
  return trimmed;
};
export const validateNumber = (userInput) => {
  if (Number.isNaN(userInput)) throw new Error("[ERROR] 숫자를 입력해주세요");
  if (!Number.isFinite(userInput))
    throw new Error("[ERROR] 유효한 숫자를 입력해주세요");
  return userInput;
};
export const validateRange = (number) => {
  if (number > LOTTO_INTO.LOTTO_MAX_NUMBER)
    throw new Error("[ERROR] 로또 번호는 45이하의 숫자로 입력해주세요");
  if (number < LOTTO_INTO.LOTTO_MIN_NUMBER)
    throw new Error("[ERROR] 로또 번호는 1이상의 숫자로 입력해주세요");
  return number;
};
export const validateNoDuplicate = (lottoNumbers) => {
  if (lottoNumbers.length !== new Set(lottoNumbers).size)
    throw new Error("[ERROR] 로또 번호는 중복되지 않는 숫자로 입력해주세요");
  return lottoNumbers;
};
export const validateCount = (lottoNumbers) => {
  if (lottoNumbers.length !== 6)
    throw new Error("[ERROR] 로또는 6개의 숫자로 이루어져야 합니다.");
  return lottoNumbers;
};
export const validatePositive = (number) => {
  if (number < 0) throw new Error("[ERROR] 양수만 입력해주세요");
  return number;
};
export const validateUnit = (purchaseAmount) => {
  if (purchaseAmount % 1000 !== 0)
    throw new Error("[ERROR] 1000 단위의 숫자로 입력해주세요");
  return purchaseAmount;
};
export const validateYesNo = (string) => {
  if (string !== "y" && string !== "n")
    throw new Error("[ERROR] y혹은 n만 입력해주세요(대문자 가능)");
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
  if (winningNumbers.includes(bonusNumber))
    throw new Error("[ERROR] 보너스 번호는 당첨 번화와 중복될 수 없습니다.");
  return bonusNumber;
};
export const validateRestartInput = (yn) => {
  validateEmpty(yn);
  validateYesNo(yn);
  return yn;
};
