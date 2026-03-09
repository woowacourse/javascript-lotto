import { readLine } from '../src/step1/Utils.js';
import { pickNumberInRange } from '../src/step1/Utils.js';
import App from '../src/step1/App.js';

jest.mock('../src/step1/Utils.js', () => ({
  ...jest.requireActual('../src/step1/Utils.js'),
  readLine: jest.fn(),
  read: { close: jest.fn() },
  pickNumberInRange: jest.fn(),
}));

const logSpy = jest.spyOn(console, 'log');

const runException = async (inputs, expectedMessage) => {

  inputs.forEach((input) => {
    readLine.mockImplementationOnce(() => {
      return input;
    });
  });

  await App.run();

  expect(logSpy).toHaveBeenCalledWith(expectedMessage);
};

describe('구입 금액 입력예외 테스트', () => {
  beforeEach(() => {
    pickNumberInRange.mockReturnValue([1, 2, 3, 4, 5, 6]);
  });

  test('1000원 단위가 아닌 입력예외 테스트', async () => {
    runException(
      ['600', '1000', '1,2,3,4,5,6', '10', 'n'],
      '[ERROR] 1000원 단위만 입력 가능합니다.',
    );
  });

  test('정수가 아닌 입력 예외 테스트', async () => {
    runException(
      ['ㅁ', '1000', '1,2,3,4,5,6', '10', 'n'],
      '[ERROR] 숫자만 입력해 주세요.',
    );
  });
});

describe('당첨 번호 입력 예외 테스트', () => {
  test.each([
    ['1'],
    [''],
    ['1,2,3,4,5,6,7'],
  ])('당첨 번호가 6개가 아닌 입력 예외 테스트', async (input) => {
    runException(
      ['1000', input, '1,2,3,4,5,6', '10', 'n'],
      '[ERROR] 당첨 로또 번호는 숫자 6개여야 합니다.',
    );
  });

  test('중복되는 당첨 번호 존재 입력 예외 테스트', async () => {
    runException(
      ['1000', '1,1,2,3,4,5', '1,2,3,4,5,6', '10', 'n'],
      '[ERROR] 중복되는 당첨 번호는 사용할 수 없습니다.',
    );
  });

  test('정수가 아닌 당첨 번호 입력 예외 테스트', async () => {
    runException(
      ['1000', 'a,1,2,3,4,5', '1,2,3,4,5,6', '10', 'n'],
      '[ERROR] 당첨 번호는 숫자만 입력 가능합니다.',
    );
  });

  test('1 ~ 45가 아닌 입력 예외 테스트', async () => {
    runException(
      ['1000', '1,2,3,5,6,46', '1,2,3,4,5,6', '10', 'n'],
      '[ERROR] 당첨 번호는 1 ~ 45 이내 숫자만 입력 가능합니다.',
    );
  });
});

describe('보너스 번호 입력 예외 테스트', () => {
  test('정수가 아닌 보너스 번호 입력 예외 테스트', async () => {
    runException(
      ['1000', 'a,1,2,3,4,5', '1,2,3,4,5,6', 'z', '21', 'n'],
      '[ERROR] 보너스 번호는 숫자만 입력 가능합니다.',
    );
  });

  test('1 ~ 45가 아닌 보너스 번호 입력 예외 테스트', async () => {
    runException(
      ['1000', '1,2,3,4,5,6', '46', '10', 'n'],
      '[ERROR] 보너스 번호는 1 ~ 45 이내 숫자만 입력 가능합니다.',
    );
  });

  test('당첨 번호와 동일한 입력 예외 테스트', async () => {
    runException(
      ['1000', '1,2,3,4,5,6', '3', '41', 'n'],
      '[ERROR] 보너스 번호는 당첨번호와 중복될 수 없습니다.',
    );
  });
});

describe('재시작 입력 예외 테스트', () => {
  test('y 또는 n외 입력 테스트', async () => {
    runException(
      ['1000', '1,2,3,4,5,6', '7', 'zzz', 'n'],
      '[ERROR] 다시시작 입력은 y 또는 n 만 입력 가능합니다.',
    );
  });
});
