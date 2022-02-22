const isEmpty = money => {
  return money === '';
};

const isNotNumber = money => {
  return Number.isNaN(money) || typeof money !== 'number';
};

const isNotUnitOfThousand = purchaseMoney => {
  return purchaseMoney % 1000 !== 0 || purchaseMoney < 1000;
};

const invalidPurchaseMoney = purchaseMoney => {
  if (isEmpty(purchaseMoney)) {
    throw new Error('구입할 금액을 입력해 주세요.');
  }

  if (isNotNumber(purchaseMoney)) {
    throw new Error('구입할 금액은 숫자여야 합니다.');
  }

  if (isNotUnitOfThousand(purchaseMoney)) {
    throw new Error('구입할 금액의 단위는 1,000원 단위 입니다.');
  }
};

export { invalidPurchaseMoney };
