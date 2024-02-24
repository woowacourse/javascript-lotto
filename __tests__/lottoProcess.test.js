import Lotto from '../src/domain/Lotto';
import LottoProcess from '../src/domain/LottoProcess';
import WinLotto from '../src/domain/WinLotto';

describe('로또 프로세스 도메인 테스트', () => {
  test('6개의 숫자를 맞추면 1등 인덱스가 +1 된다.', () => {
    const lottos = [new Lotto([1, 2, 3, 4, 5, 6])];
    const lottoWithWinNumbers = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 7;

    const winLotto = new WinLotto(lottoWithWinNumbers, bonusNumber);
    const lottoProcess = new LottoProcess();

    expect(lottoProcess.getResult(lottos, winLotto)).toEqual([1, 0, 0, 0, 0]);
  });

  test('5개의 숫자를 맞추고 보너스를 맞추면 2등 인덱스가 +1 된다.', () => {
    const lottos = [new Lotto([1, 2, 3, 4, 5, 10])];
    const lottoWithWinNumbers = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 10;

    const winLotto = new WinLotto(lottoWithWinNumbers, bonusNumber);
    const lottoProcess = new LottoProcess();

    expect(lottoProcess.getResult(lottos, winLotto)).toEqual([0, 1, 0, 0, 0]);
  });

  test('5개의 숫자를 맞추면 3등 인덱스가 +1 된다.', () => {
    const lottos = [new Lotto([1, 2, 3, 4, 5, 10])];
    const lottoWithWinNumbers = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 7;

    const winLotto = new WinLotto(lottoWithWinNumbers, bonusNumber);
    const lottoProcess = new LottoProcess();

    expect(lottoProcess.getResult(lottos, winLotto)).toEqual([0, 0, 1, 0, 0]);
  });
  test('4개의 숫자를 맞추면 4등 인덱스가 +1 된다.', () => {
    const lottos = [new Lotto([1, 2, 3, 4, 10, 20])];
    const lottoWithWinNumbers = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 7;

    const winLotto = new WinLotto(lottoWithWinNumbers, bonusNumber);
    const lottoProcess = new LottoProcess();

    expect(lottoProcess.getResult(lottos, winLotto)).toEqual([0, 0, 0, 1, 0]);
  });

  test('3개의 숫자를 맞추면 5등 인덱스가 +1 된다.', () => {
    const lottos = [new Lotto([1, 2, 3, 10, 20, 30])];
    const lottoWithWinNumbers = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 7;

    const winLotto = new WinLotto(lottoWithWinNumbers, bonusNumber);
    const lottoProcess = new LottoProcess();

    expect(lottoProcess.getResult(lottos, winLotto)).toEqual([0, 0, 0, 0, 1]);
  });

  test('2개 이상의 로또가 당첨되도 결과값에 잘 반영된다. ', () => {
    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    const lotto2 = new Lotto([1, 2, 3, 4, 5, 7]);

    const lottos = [lotto1, lotto2];
    const lottoWithWinNumbers = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 7;

    const winLotto = new WinLotto(lottoWithWinNumbers, bonusNumber);
    const lottoProcess = new LottoProcess();

    expect(lottoProcess.getResult(lottos, winLotto)).toEqual([1, 1, 0, 0, 0]);
  });
});
