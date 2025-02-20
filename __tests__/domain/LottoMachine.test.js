import LottoMachine from "../../src/domain/lottoMachine.js";

test("입력 받은 금액만큼 로또 개수를 계산한다.", () => {
  const input = Number("1000");

  const lottoMachine = new LottoMachine();

  expect(lottoMachine.getLottoCount(input)).toBe(1);
});

test("무작위로 생성된 숫자의 개수는 6개이다.", () => {
  const lottoMachine = new LottoMachine();

  expect(lottoMachine.drawRandomNumbers(1, 45, 6).length).toBe(6);
});

test("무작위로 생성된 숫자는 서로 중복되지 않는다.", () => {
  const lottoMachine = new LottoMachine();

  const randomNumbers = lottoMachine.drawRandomNumbers(1, 45, 6);

  expect(new Set(randomNumbers).size).toBe(randomNumbers.length);
});

test("무작위로 생성된 숫자는 오름차순으로 정렬되어야 한다.", () => {
  const lottoMachine = new LottoMachine();

  const randomNumbers = lottoMachine.drawRandomNumbers(1, 45, 6);

  expect([...randomNumbers].sort((a, b) => a - b)).toStrictEqual(randomNumbers);
});

test("생성된 숫자로 로또를 생성한다", () => {
  const lottoMachine = new LottoMachine();

  const randomNumbers = lottoMachine.drawRandomNumbers(1, 45, 6);

  expect([...randomNumbers].sort((a, b) => a - b)).toStrictEqual(randomNumbers);
});
