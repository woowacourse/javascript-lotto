import { divider } from '../utils/util';
import { LOTTERY_TICKET_PRICE } from '../constants/constants';

import LotteryTicketManager from '../LotteryTicketManager';

describe('로또 구입 기능 테스트', () => {
  it('입력 금액으로 구입할 수 있는 로또 최대 개수를 구한다.', () => {
    const charge = 5500;
    const expectResult = {
      quotient: 5,
      remainder: 500,
    };
    expect(divider(charge, LOTTERY_TICKET_PRICE)).toStrictEqual(expectResult);
  });

  it('주어진 개수의 로또를 발급한다.', () => {
    const count = 7;
    const lottoManager = new LotteryTicketManager();
    lottoManager.generateNewLottos(count);

    expect(lottoManager.tickets).toHaveLength(count);
  });
});
