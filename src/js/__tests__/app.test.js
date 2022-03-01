describe('로또 구입 금액 테스트', () => {
  const MIN_MONEY = 1000;
  const MAX_MONEY = 10000;

  it('입력된 금액은 1000원으로 나누어 떨어져야 한다.', () => {
    const isThousandMultiple = (money) => money % MIN_MONEY === 0;

    expect(isThousandMultiple(1000)).toBe(true);
  });

  it('입력된 금액은 1000원 이상 10000원 이하여야 한다.', () => {
    const isOverThouand = (money) => money >= MIN_MONEY;
    const isUnderMillion = (money) => money <= MAX_MONEY;
    const isValidMoneyRange = (money) => isOverThouand(money) && isUnderMillion(money);

    expect(isValidMoneyRange(1000)).toBe(true);
    expect(isValidMoneyRange(10000)).toBe(true);
  });
});

describe('랜덤 숫자 테스트', () => {
  it('랜덤 숫자는 중복되지 않는 6개의 숫자이다', () => {
    // 랜덤 숫자 추출하는 메서드
    const generateRandomNumber = () => Math.floor(Math.random() * 45) + 1;

    // 6개 숫자를 만드는 메서드
    const generateLottoNumber = () => {
      const numbers = [];
      while (numbers.length < 6) {
        const randomNumber = generateRandomNumber();
        if (!numbers.includes(randomNumber)) {
          numbers.push(randomNumber);
        }
      }
      return numbers;
    };

    // set 길이 6인지 확인하는 메서드
    const isNoDuplicate = (numbers) => new Set([...numbers]).size;

    expect(isNoDuplicate(generateLottoNumber())).toBe(6);
  });
});
