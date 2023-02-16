import parseToNumberTypeArray from '../src/utils/parseToNumberTypeArray.js';
import getSameElementCount from '../src/utils/getSameElementCount.js';
import isExistData from '../src/utils/isExistData.js';
import getProfitRate from '../src/utils/getProfitRate.js';

describe('유틸 함수 테스트', () => {
  test('당첨 번호 문자열을 숫자 배열로 파싱한다', () => {
    const lottoNumbers = parseToNumberTypeArray('11 ,2 , 44,  29  ,3 ,6');
    expect(lottoNumbers).toEqual([11, 2, 44, 29, 3, 6]);
  });

  test('두 배열의 숫자들을 비교하여 같은 숫자의 수를 반환한다.', () => {
    const sameNumberLength = getSameElementCount([1, 2, 3, 4, 5, 6], [4, 5, 6, 7, 8, 9]);
    expect(sameNumberLength).toBe(3);
  });

  test('첫 인자로 들어온 수가 두 번쨰 인자 배열에 존재하는 값인지 확인한다', () => {
    const isInclude = isExistData(6, [1, 2, 3, 4, 5, 6]);
    expect(isInclude).toBeTruthy();
  });

  test('구매 금액과 상금을 비교해서 수익률을 계산한다.', () => {
    const purchaseMoney = 8000;
    const prizeMoney = 5000;

    const profitRate = getProfitRate(purchaseMoney, prizeMoney);

    expect(profitRate.toFixed(1)).toBe('62.5');
  });
});
