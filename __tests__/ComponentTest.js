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
});
