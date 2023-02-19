import Seller from '../src/domain/Seller';

describe('Seller', () => {
  context('Seller에게 돈을 주었을 때', () => {
    it.each([
      { money: 8000, amount: 8 },
      { money: 1000, amount: 1 },
    ])('$money원을 주었을 때 로또를 $amount장 받을 수 있어야 한다.', ({ money, amount }) => {
      const seller = new Seller();

      expect(seller.sellLottos(money)).toHaveLength(amount);
    });
  });
});
