import Machine from '../src/Machine.js';

test('구입 금액만큼 로또를 발행한다.', () => {
  const money = 8000;

  const machine = new Machine();
  machine.createLottos(money);

  expect(machine.getLottos()).toHaveLength(8);
});
