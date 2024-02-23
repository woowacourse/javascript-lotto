// util 느낌
const ValidatorCondition = {
  checkArrayLengthSame(array, count) {
    return array.length === count;
  },

  checkArrayNotEmpty(array) {
    return array.length !== 0;
  },

  checkArrayElementType(array, type) {
    return array.every((element) => typeof element === type);
  },

  checkIsNotNaN(array) {
    return array.every((element) => !Number.isNaN(element));
  },

  checkArrayElementInteger(array) {
    return array.every((element) => Number.isInteger(element));
  },

  checkIsArray(array) {
    return Array.isArray(array);
  },

  checkArrayElementArray(array) {
    return array.every((element) => Array.isArray(element));
  },

  checkRangeNumbers(numbers, min, max) {
    return numbers.every((number) => min <= number && number <= max);
  },

  checkIsUnique(array) {
    return new Set(array).size === array.length;
  },

  checkNumberNotInArray(array, number) {
    return !array.includes(number);
  },

  checkIsDivisible(number, divisor) {
    return number % divisor === 0;
  },
};

const Validator = {
  checkLottoNumbers(lottoNumbers) {
    const lottoCount = 6;
    const lottoNumberType = "number";
    const lottoMinNumber = 1;
    const lottoMaxNumber = 45;

    return (
      ValidatorCondition.checkArrayLengthSame(lottoNumbers, lottoCount) &&
      ValidatorCondition.checkArrayElementType(lottoNumbers, lottoNumberType) &&
      ValidatorCondition.checkArrayElementInteger(lottoNumbers) &&
      ValidatorCondition.checkRangeNumbers(
        lottoNumbers,
        lottoMinNumber,
        lottoMaxNumber,
      ) &&
      ValidatorCondition.checkIsUnique(lottoNumbers)
    );
  },

  checkBonusNumber(winningNumbers, bonusNumber) {
    const bonusNumberType = "number";
    const lottoMinNumber = 1;
    const lottoMaxNumber = 45;

    return (
      ValidatorCondition.checkArrayElementType(
        [bonusNumber],
        bonusNumberType,
      ) &&
      ValidatorCondition.checkArrayElementInteger([bonusNumber]) &&
      ValidatorCondition.checkRangeNumbers(
        [bonusNumber],
        lottoMinNumber,
        lottoMaxNumber,
      ) &&
      ValidatorCondition.checkNumberNotInArray(winningNumbers, bonusNumber)
    );
  },

  checkSixNumbersArray(sixNumbersArray) {
    return (
      ValidatorCondition.checkIsArray(sixNumbersArray) &&
      ValidatorCondition.checkArrayNotEmpty(sixNumbersArray) &&
      ValidatorCondition.checkArrayElementArray(sixNumbersArray)
    );
  },

  checkPurchaseAmount(purchaseAmount) {
    const purchaseAmountType = "number";
    const lottoPrice = 1000;
    const minPurchaseAmount = 1000;
    const maxPurchaseAmount = 100000;

    return (
      ValidatorCondition.checkIsNotNaN([purchaseAmount]) &&
      ValidatorCondition.checkArrayElementType(
        [purchaseAmount],
        purchaseAmountType,
      ) &&
      ValidatorCondition.checkIsDivisible(purchaseAmount, lottoPrice) &&
      ValidatorCondition.checkRangeNumbers(
        [purchaseAmount],
        minPurchaseAmount,
        maxPurchaseAmount,
      )
    );
  },

  checkLottoCount(lottoCount) {
    const lottoCountType = "number";
    const minLottoCount = 1;
    const maxLottoCount = 100;

    return (
      ValidatorCondition.checkArrayElementType([lottoCount], lottoCountType) &&
      ValidatorCondition.checkArrayElementInteger([lottoCount]) &&
      ValidatorCondition.checkRangeNumbers(
        [lottoCount],
        minLottoCount,
        maxLottoCount,
      )
    );
  },
};

export default Validator;
