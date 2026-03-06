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

    expect(pickNumberInRange(1, 10, 6)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
