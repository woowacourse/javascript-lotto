import ValidatorImpl from '../ValidatorImpl/index.js';

describe('요금을 1000원 이상 투입해야 한다.', () => {
  const { isLackFare } = new ValidatorImpl().checkFunctions;

  test('1000원 미만은 게임을 실행할 수 없다.', () => {
    const fare1 = 500;
    const fare2 = -500;
    const fare3 = 100.1;
    const fare4 = 999;

    expect(isLackFare(fare1)).toBe(true);
    expect(isLackFare(fare2)).toBe(true);
    expect(isLackFare(fare3)).toBe(true);
    expect(isLackFare(fare4)).toBe(true);
  });

  test('1000원 이상으로 게임 실행이 가능하다.', () => {
    const fare1 = 1000;
    const fare2 = 1000.01;

    expect(isLackFare(fare1)).toBe(false);
    expect(isLackFare(fare2)).toBe(false);
  });
});
