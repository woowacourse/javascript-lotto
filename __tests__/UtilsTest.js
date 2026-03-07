import { pickNumberInRange } from '../src/step1/Utils.js';


describe('유틸 함수 테스트', () => {
  test('range가 범위 내 숫자 수보다 클 경우 예외 반환 테스트', () => {
    expect(
      () => pickNumberInRange(1, 5, 6)).toThrow('반환할 난수의 갯수가 범위 내 숫자 수 보다 많습니다.');
  });

  test('min, max 경계값또한 반환되는지 테스트', () => {
    const arr = pickNumberInRange(1, 5, 5);
    expect(arr.includes(1)).toBeTruthy();
    expect(arr.includes(5)).toBeTruthy();
  });
});
