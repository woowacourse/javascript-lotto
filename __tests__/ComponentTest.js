import Component from '../src/step2/Component.js';


describe('컴포넌트 테스트', () => {
  test('lottos 배열로 로또 리스트 컴포넌트 반한', () => {
    const lottoListComponent = Component.lottoList([[1, 2, 3, 4, 5, 6], [10, 11, 12, 13, 14, 15]]);
    const expected = '<ul id="purchase-lotto-list">'
    + '<li><span>🎟️</span>1, 2, 3, 4, 5, 6</li>'
    + '<li><span>🎟️</span>10, 11, 12, 13, 14, 15</li>'
    + '</ul>'
  
    expect(lottoListComponent).toEqual(expected);
  });

  test('로또 매치 결과 테이블 컴포넌트', () => {
    const summary = [
      { label: '3개 일치', prize: '500', result: 3 },
      { label: '4개 일치', prize: '1,000', result: 100 },
    ]

    const lottoMatchResultComponent = Component.lottoMatchResultTable(summary);
    const expected = '<table id="lotto-match-result">'
    + '<thead><th>일치 갯수</th><th>당첨금</th><th>당첨 갯수</th></thead>'
    + '<tbody><tr><td>3개 일치</td><td>500</td><td>3</td></tr>'
    + '<tr><td>4개 일치</td><td>1,000</td><td>100</td></tr>'
    + '</tbody></table>'
    expect(lottoMatchResultComponent).toEqual(expected);
  });

  test('로또 수익률 컴포넌트', () => {
    const rateOfReturnComponent = Component.rateOfReturnMessage('12345.0');
    expect(rateOfReturnComponent).toEqual('<p id="lotto-rate-of-return">당신의 총 수익률은 12345.0%입니다.</p>');
  });

  test('재시작 버튼 컴포넌트', () => {
    const restartButton = Component.restartButton();
    expect(restartButton).toEqual('<button type="button" id="restart-button">다시 시작하기</button>');
  });
});
