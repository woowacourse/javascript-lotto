import LottoMachine from '../machine/lottoMachine';

describe('당첨 금액 계산 테스트', () => {
  // 로또 번호, 당첨 번호를 머신에 저장하고 일치 계산
  const getMatchResult = (lottoArray, winnerNumbers) => {
    const lottoMachine = new LottoMachine();
    lottoMachine.lottoArray = lottoArray;
    return lottoMachine.getMatches(winnerNumbers);
  };

  test('한 개의 로또와 당첨 번호를 비교해 일치 번호의 갯수를 반환한다.', () => {
    const lottoArray = [new Set([1, 2, 3, 4, 5, 6])];
    const winnerNumbers = { numbers: [1, 2, 3, 45, 44, 43], bonus: 6 };

    const matchResult = getMatchResult(lottoArray, winnerNumbers);

    expect(matchResult.matches[3]).toEqual(1);
  });

  test('일치 번호의 갯수가 5개일 때 보너스 번호를 체크한다.', () => {
    const lottoArray = [new Set([1, 2, 3, 4, 5, 6])];
    const winnerNumbers = { numbers: [1, 2, 3, 4, 5, 7], bonus: 6 };

    const matchResult = getMatchResult(lottoArray, winnerNumbers);

    expect(matchResult.matches['5+']).toEqual(1);
  });

  test('여러 개의 로또와 당첨 번호를 비교해 일치 번호의 갯수를 반환한다.', () => {
    const lottoArray = [
      new Set([1, 2, 3, 4, 5, 6]),
      new Set([1, 2, 3, 4, 5, 8]),
      new Set([11, 12, 13, 4, 5, 7]),
      new Set([11, 12, 13, 4, 5, 7]),
      new Set([11, 12, 13, 14, 5, 7]),
    ];
    const winnerNumbers = { numbers: [1, 2, 3, 4, 5, 7], bonus: 6 };

    const manualMatch = { 2: 1, 3: 2, 5: 1, '5+': 1 };

    const matchResult = getMatchResult(lottoArray, winnerNumbers);

    expect(matchResult.matches).toEqual(manualMatch);
  });

  test('로또와 당첨번호를 비교해 수익률을 계산할 수 있다.', () => {
    const lottoArray = [
      new Set([11, 12, 13, 4, 5, 7]),
      new Set([11, 12, 13, 4, 5, 7]),
      new Set([11, 12, 13, 14, 5, 7]),
      new Set([11, 12, 13, 14, 5, 7]),
      new Set([11, 12, 13, 14, 5, 7]),
    ];
    const winnerNumbers = { numbers: [1, 2, 3, 4, 5, 7], bonus: 6 };

    const manualProfit = ((5000 * 2) / 5000) * 100 - 100;

    const matchResult = getMatchResult(lottoArray, winnerNumbers);

    expect(matchResult.profit).toEqual(manualProfit);
  });
});
