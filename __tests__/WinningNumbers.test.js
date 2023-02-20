const WinningNumbers = require('../src/domain/WinningNumbers');

describe('WinningNumbers 클래스 테스트', () => {
  test.each([
    ['1.2.3.4.5.6'],
    [''],
    ['1,2,3,4,5'],
    ['1,2,3,4,5.6'],
    ['1,2,3,4,5.46'],
    ['1,2,3,4,5,5'],
    ['a,b,c,d,e,f'],
  ])(
    '당첨번호를 쉼표로 구분했을 때 1 ~ 45 범위에 속하는 숫자 6개가 아닌 경우 예외처리한다.',
    (input) => {
      expect(() => {
        new WinningNumbers(input);
      }).toThrow();
    }
  );

  test.each([['1,2,3,4,5,6'], ['1,2,3,4,5,45'], ['40,41,42,43,44,45']])(
    '당첨번호를 쉼표로 구분했을 때 1 ~ 45 범위에 속하는 숫자 6개인 경우 정상동작.',
    (input) => {
      expect(() => {
        new WinningNumbers(input);
      }).not.toThrow();
    }
  );
});
