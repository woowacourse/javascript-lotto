import { pickNumberInRange } from '../src/step1/Utils.js';


describe('유틸 함수 테스트', () => {
  test('범위내 랜덤값 반환 테스트', () => {
    jest.spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.3)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.6);

    expect(pickNumberInRange(1, 10, 6)).toEqual([2, 3, 4, 5, 6, 7]);
  });

  test('range가 범위 내 숫자 수보다 클 경우 예외 반환 테스트', () => {
    expect(
      () => pickNumberInRange(1, 5, 6)).toThrow('반환할 난수의 갯수가 범위 내 숫자 수 보다 많습니다.');
  });
});
