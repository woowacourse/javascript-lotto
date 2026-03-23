import Converter from '../src/step2/Converter.js';

describe('데이터 전환 테스트', () => {
  test('matchResultSummary 데이터 label의 일치를 제거', () => {
    const summary = [
      { label: '3개 일치', prize: 1000, result: 3 },
      { label: '5개 일치, 보너스 볼 일치', prize: 2000, result: 5 },
    ]
    const expected = [
      { label: '3개 ', prize: 1000, result: 3 },
      { label: '5개 , 보너스 볼 ', prize: 2000, result: 5 },
    ]
    expect(Converter.matchResultSummary(summary)).toEqual(expected);
  });
});
