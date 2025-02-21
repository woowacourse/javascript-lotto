import ERROR_MESSAGE from '../src/settings/ErrorMessage.js';
import validateNumberInRange from '../src/Validation/validateNumberInRange.js';
describe('validateNumberInRange 테스트', () => {
  it(`보너스 번호가 1-45내의 숫자로 설정했을때, [1]이 들어간경우 ${ERROR_MESSAGE.numberOutOfRange}에러를 던진다`, () => {
    const bonusNumber = [1];
    expect(validateNumberInRange(bonusNumber)).toStrictEqual([1]);
  });

  it(`보너스 번호가 1-45내의 숫자로 설정했을때, [0]이 들어간경우, ${ERROR_MESSAGE.numberOutOfRange}에러를 던진다`, () => {
    const bonusNumber = [0];
    expect(() => {
      validateNumberInRange(bonusNumber);
    }).toThrow(ERROR_MESSAGE.numberOutOfRange);
  });

  it(`보너스 번호가 1-45내의 숫자로 설정했을때, [46]이 들어간경우, ${ERROR_MESSAGE.numberOutOfRange}에러를 던진다`, () => {
    const bonusNumber = [46];
    expect(() => {
      validateNumberInRange(bonusNumber);
    }).toThrow(ERROR_MESSAGE.numberOutOfRange);
  });
});
