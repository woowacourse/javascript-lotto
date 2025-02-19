import Calculator from "../src/Calculator.js";

test.each([
  [[[1,2,3,4,5,6]], 1, '1등'],
  [[[1,2,3,4,5,9]], 1, '2등'],
  [[[1,2,3,4,5,10]], 1, '3등'],
  [[[1,2,3,4,7,10]], 1, '4등'],
  [[[1,2,3,8,7,10]], 1, '5등'],

])('일치하는 개수에 맞는 등수의 값이 증가한다.', (lottos, expected, key) => {
  const winningCount = Calculator.winningCount(lottos, {winning:[1,2,3,4,5,6], bonus: 9});

  expect(winningCount[key]).toBe(expected);
})