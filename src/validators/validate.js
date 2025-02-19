const validateType = (key, value) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`${key}은(는) 숫자여야 합니다.`);
  }
};

const validateRange = (purchasePrice) => {
  if (purchasePrice < 1000 || purchasePrice > 1000000) {
    throw new Error("구매 금액은 1,000원 이상 1,000,000원 이하여야 합니다.");
  }
};

const validateUnit = (purchasePrice) => {
  if (purchasePrice % 1000 !== 0) {
    throw new Error("구매 금액은 1,000원 단위로 입력해야 합니다.");
  }
};

const validateCount = (key, value) => {
  if (value.length !== 6) {
    throw new Error(`${key}은(는) 6개여야 합니다.`);
  }
};

export { validateType, validateRange, validateUnit, validateCount };
