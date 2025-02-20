import { validateMoney, validateLottoNumber, validateBonus } from "../src/domain/validation";

describe('로또 구입 금액',() => {
  test('로또 구입 금액은 1,000원으로 나누어떨어져야 한다.',() => {
      const money = 1000;
      expect(() => {
          validateMoney(money);
      }).not.toThrow();
  })

  test('로또 구입 금액은 1,000원으로 나누어 떨어지지 않으면 에러를 발생한다.',() => {
    const money = 1001;
    expect(() => {
        validateMoney(money);
    }).toThrow();
  });

  test.each([
    [0], [-1000] 
  ])('로또 구입 금액은 0원 이하일 경우 에러를 발생한다..',(money) => {
    expect(() => {
        validateMoney(money);
    }).toThrow();
  });
})

describe('로또 숫자',() => {
  test.each([
    [[1, 2, 3, 4, 5, 6, 7]],
    [[1, 2, 3, 4, 5]]
  ])('로또의 번호 숫자는 6개가 아닐시 에러가 발생한다.', (lottoNumbers) => {
    expect(() => validateLottoNumber(lottoNumbers))
      .toThrow('로또 번호는 6자리여야 한다.');
  });

  test.each([
    [[0, 1, 2, 3, 4, 5]], [[41, 42, 43, 44, 45, 46]],
  ])('로또의 번호의 숫자 범위는 1 미만 혹은 45 초과하면 에러가 발생한다.', (lottoNumbers) => {
    // then
    expect(() => validateLottoNumber(lottoNumbers))
      .toThrow('로또 번호의 숫자 범위 1 ~ 45이다.');
  });

  test.each([
    [[1, 1, 2, 3, 4, 5]], [[41, 42, 43, 44, 45, 45]],
  ])('로또의 번호의 숫자는 중복된 숫자가 있으면 안된다.', (lottoNumbers) => {
    // then
    expect(() => validateLottoNumber(lottoNumbers))
      .toThrow('로또 번호의 숫자는 중복될 수 없다.');
  });
});

describe('보너스 숫자', () => {
    const winningLotto = [1,2,3,4,5,6];
  
  test.each([
    [0], [46],
  ])('보너스 번호의 숫자 범위는 1 미만 혹은 45 초과하면 에러가 발생한다.', (bonus) => {
    // then
    expect(() => validateBonus(bonus, winningLotto))
      .toThrow('보너스 번호의 숫자 범위 1 ~ 45이다.');
  });

  test('보너스 번호는 당첨 로또의 있는 숫자와 중복되면 안된다.', () => {
    const bonus = 6;

    expect(() => validateBonus(bonus, winningLotto))
      .toThrow('보너스 번호는 당첨 로또의 있는 숫자와 중복되면 안된다.');
  })
})