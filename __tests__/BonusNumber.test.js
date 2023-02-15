const BonusNumber = require('../src/domain/BonusNumber');

test('보너스 번호 입력 값이 1 ~ 45 이내의 숫자인 경우 정상 동작.', () => {
  const input = '45';

  expect(() => {
    new BonusNumber(input);
  }).not.toThrow();
});

test('보너스 번호 입력 값이 1 ~ 45 이내의 숫자가 아닌 경우 예외처리.', () => {
  const input = '675';

  expect(() => {
    new BonusNumber(input);
  }).toThrow();
});
