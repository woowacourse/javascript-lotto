const checkValid = money => {
  if (money === '') {
    throw new Error();
  }
};

const checkValidNumber = money => {
  if (Number.isNaN(money) || typeof money !== 'number') {
    throw new Error();
  }
};

const checkUnitOfThousand = purchaseMoney => {
  if (purchaseMoney % 1000 !== 0 || purchaseMoney < 1000) {
    throw new Error();
  }
};

describe('구입할 금액 입력 기능 테스트', () => {
  it('구입할 금액으로 공백을 입력하면 안된다.', () => {
    const purchaseMoney = '';
    expect(() => checkValid(purchaseMoney)).toThrowError();
  });

  it('구입할 금액으로 숫자 타입을 입력해야 한다.', () => {
    const purchaseMoney = 'abc';
    expect(() => checkValidNumber(purchaseMoney)).toThrowError();
  });

  it('구입할 금액으로 천원 단위만 입력해야 한다.', () => {
    const purchaseMoney = 1250;
    expect(() => checkUnitOfThousand(purchaseMoney)).toThrowError();
  });

  it('구입할 금액으로 소수점은 입력할 수 없다.', () => {
    const purchaseMoney = 1000.5;
    expect(() => checkUnitOfThousand(purchaseMoney)).toThrowError();
  });

  it('구입할 금액으로 최소 금액은 천원이상 이여야 한다.', () => {
    const purchaseMoney = 900;
    expect(() => checkUnitOfThousand(purchaseMoney)).toThrowError();
  });

  it('구입할 금액으로 양의 정수여야 한다.', () => {
    const purchaseMoney = -1;
    expect(() => checkUnitOfThousand(purchaseMoney)).toThrowError();
  });
});
