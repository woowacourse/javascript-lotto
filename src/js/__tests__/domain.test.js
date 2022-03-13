import LottoController from '../controller/LottoController';
import Lotto from '../model/Lotto';
import { LOTTO_DIGIT } from '../model/constants';

describe('랜덤 숫자 테스트', () => {
  it('랜덤 숫자는 중복되지 않는 6개의 숫자이다', () => {
    const lotto = new Lotto();

    expect(new Set([...lotto.lottoNumbers]).size).toBe(LOTTO_DIGIT);
  });
});

describe('결과 확인 테스트', () => {  
  it('나의 로또와 당첨 로또의 숫자가 몇 개 일치하는지 확인할 수 있다', () => {
    const controller = new LottoController();
    controller.setWinningLottos([4,15,25,36,41,27,33]);
    const fourMatchedLotto = [4,15,25,36,42,43];

    expect(controller.getHowManyMatched(fourMatchedLotto)).toBe(4);
  });

  it('3등에 당첨된 로또의 개수를 구할 수 있어야 한다', () => {
    const controller = new LottoController();
    controller.setWinningLottos([4,15,25,36,41,27,33]);

    const thirdPlaceLotto = new Lotto();
    thirdPlaceLotto.setLottoNumbers([4,15,25,36,41,1,2]);
    controller.setLottos([thirdPlaceLotto]);

    controller.saveMatchedCount();
    expect(controller.getWinnerStatistic()).toStrictEqual([0,0,1,0,0]);
  });

  it('1등과 2등에 당첨된 로또의 개수를 구할 수 있어야 한다', () => {
    const controller = new LottoController();
    controller.setWinningLottos([4,15,25,36,41,27,33]);

    const secondPlaceLotto = new Lotto();
    secondPlaceLotto.setLottoNumbers([4,15,25,36,41,33]);

    const firstPlaceLotto = new Lotto();
    firstPlaceLotto.setLottoNumbers([4,15,25,36,41,27]);

    controller.setLottos([firstPlaceLotto, secondPlaceLotto]);
    controller.saveMatchedCount();

    expect(controller.getWinnerStatistic()).toStrictEqual([0,0,0,1,1]);
  });

  it('수익률을 구할 수 있어야 한다', () => {
    const controller = new LottoController();
    controller.setWinningLottos([4,15,25,36,41,27,33]);

    const fifthPlaceLotto = new Lotto();
    fifthPlaceLotto.setLottoNumbers([4,15,25,1,2,3]);

    const fourthPlaceLotto = new Lotto();
    fourthPlaceLotto.setLottoNumbers([4,15,25,36,1,2]);

    controller.setLottos([fifthPlaceLotto, fourthPlaceLotto]);
    controller.saveMatchedCount();
    
    const winnerStatistic = controller.getWinnerStatistic();

    expect(controller.getEarningsRate(winnerStatistic, 10000)).toBe(450);
  });
});
