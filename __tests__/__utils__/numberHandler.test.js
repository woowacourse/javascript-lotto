import numberHandler from '../../src/utils/numberHandler.js';

describe('numberHandler 테스트', () => {
  test.each([
    [1.123, 1.1],
    [1.56, 1.6],
    [1.0, 1],
    [100.05, 100.1],
    [100, 100],
  ])('소수점 둘째자리에서 반올림한 값을 반환한다.', (floatNumber, roundedOffNumber) => {
    expect(numberHandler.roundOffNumber(floatNumber)).toBe(roundedOffNumber);
  });

  test.each(Array.from({ length: 10 }, () => [numberHandler.generateRandomNumber(1, 45)]))(
    '1~45사이의 랜덤한 숫자를 반환한다.',
    randomNumber => {
      const rangeNumbers = Array.from({ length: 45 }, (_, index) => index + 1);

      expect(rangeNumbers.includes(randomNumber)).toBeTruthy();
    }
  );

  test.each([
    [1, '1'],
    [10, '10'],
    [100, '100'],
    [1000, '1,000'],
    [10000, '10,000'],
    [100000, '100,000'],
    [1000000, '1,000,000'],
  ])('천의 자리마다 콤마를 찍어 문자열로 반환한다.', (number, string) => {
    const numberString = numberHandler.addComma(number);

    expect(numberString).toBe(string);
    expect(typeof numberString).toBe('string');
  });
});
