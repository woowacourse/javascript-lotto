import { LOTTERY_TICKET_NUMBER } from '../constants/constants';
import LotteryTicket from '../LotteryTicket';

describe('로또 번호 자동 생성 테스트', () => {
  it('로또 1장은 6개의 번호를 가진다.', () => {
    const ticket = new LotteryTicket();
    expect(ticket.numbers).toHaveLength(LOTTERY_TICKET_NUMBER.LENGTH);
  });

  it('로또의 각 번호는 1 이상, 45 이하의 정수다.', () => {
    const ticket = new LotteryTicket();
    ticket.numbers.forEach(number => {
      expect(Number.isInteger(number)).toBeTruthy();
      expect(number).toBeGreaterThanOrEqual(LOTTERY_TICKET_NUMBER.MIN);
      expect(number).toBeLessThanOrEqual(LOTTERY_TICKET_NUMBER.MAX);
    });
  });

  it('로또의 각 번호는 중복되지 않아야 한다.', () => {
    const ticket = new LotteryTicket();
    ticket.numbers.forEach(number => {
      expect(
        ticket.numbers.indexOf(number) === ticket.numbers.lastIndexOf(number)
      ).toBeTruthy();
    });
  });
});
