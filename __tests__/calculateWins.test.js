import { calculateWins } from '../src/service/CalculatorService.js';
import Lotto from '../src/model/Lotto.js';

describe('로또 일치 결과를 반환하는 calculateWins 테스트', () => {
  it('3개가 일치할 때 winCount의 THREE_MATCH가 정상적으로 증가한다.', () => {
    const lottos = [new Lotto([1, 3, 5, 7, 9, 11])];
    const checkedLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const checkedBonusNumber = 7;
    const parsedLotto = { checkedLotto, checkedBonusNumber };

    const winCount = calculateWins(lottos, parsedLotto);
    expect(winCount.THREE_MATCH).toBe(1);
  });
  it('4개가 일치할 때 winCount의 FOUR_MATCH가 정상적으로 증가한다.', () => {
    const lottos = [new Lotto([1, 3, 5, 6, 9, 11])];
    const checkedLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const checkedBonusNumber = 7;
    const parsedLotto = { checkedLotto, checkedBonusNumber };

    const winCount = calculateWins(lottos, parsedLotto);
    expect(winCount.FOUR_MATCH).toBe(1);
  });
  it('5개가 일치하고 보너스 넘버가 일치하지 않을 때 winCount의 FIVE_MATCH가 정상적으로 증가한다.', () => {
    const lottos = [new Lotto([1, 2, 3, 4, 6, 11])];
    const checkedLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const checkedBonusNumber = 7;
    const parsedLotto = { checkedLotto, checkedBonusNumber };
    console.log(parsedLotto);

    const winCount = calculateWins(lottos, parsedLotto);
    expect(winCount.FIVE_MATCH).toBe(1);
  });
  it('5개가 일치하고 보너스 넘버가 일치할 때 winCount의 FIVE_MATCH_WITH_BONUS가 정상적으로 증가한다.', () => {
    const lottos = [new Lotto([1, 2, 3, 4, 5, 7])];
    const checkedLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const checkedBonusNumber = 7;
    const parsedLotto = { checkedLotto, checkedBonusNumber };

    const winCount = calculateWins(lottos, parsedLotto);

    expect(winCount.FIVE_MATCH_WITH_BONUS).toBe(1);
  });
  it('6개가 일치할 때 winCount의 SIX_MATCH가 정상적으로 증가한다.', () => {
    const lottos = [new Lotto([1, 2, 3, 4, 5, 6])];
    const checkedLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const checkBonusNumber = 7;
    const parsedLotto = { checkedLotto, checkBonusNumber };

    const winCount = calculateWins(lottos, parsedLotto);
    expect(winCount.SIX_MATCH).toBe(1);
  });
});
