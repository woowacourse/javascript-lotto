import ValidationInputs from '../../src/validator/ValidationInputs';

const errorCallback = () => {
  return 'ERROR';
};

describe('ValidationInputs 클래스', () => {
  test.each([1004, 'abcd', '12ab'])(
    '입력받은 로또 구입 금액이 1000원 단위의 숫자가 아니면 에러를 반환한다.',
    (amount) => {
      expect(ValidationInputs.amount(amount, errorCallback)).toBe(errorCallback());
    }
  );

  test.each(['1,a,2,3,5,6', '123,2,3,4,5,6', 'a,,,,b'])(
    '입력받은 로또 당첨 번호가 형식에 맞지 않으면 에러를 반환한다.',
    (winningNumbers) => {
      expect(ValidationInputs.winningNumbers(winningNumbers, errorCallback)).toBe(errorCallback());
    }
  );

  test.each(['123', 'a', '!', 'ㄱ'])(
    '입력받은 보너스 번호가 형식에 맞지 않으면 에러를 반환한다.',
    (bonusNumber) => {
      expect(ValidationInputs.bonusNumber(bonusNumber, errorCallback)).toBe(errorCallback());
    }
  );

  test.each(['a', 'ㄱ', '!'])(
    '입력받은 게임 재시작 여부가 형식에 맞지 않으면 에러를 반환한다.',
    (retry) => {
      expect(ValidationInputs.retry(retry, errorCallback)).toBe(errorCallback());
    }
  );
});
