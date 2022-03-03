it('당첨 번호는 빈 칸이 있으면 안된다.', () => {
  const hasEmptyString = (list) => list.some((value) => value === '');

  const userInput = ['1', '2', '3', '', '5', '6', '7'];
  expect(hasEmptyString(userInput)).toBe(true);
});

it('당첨 번호는 1에서 45 사이의 숫자만 입력하여야 한다', () => {
  const hasOutRangeNumber = (list, minNumber, maxNumber) =>
    list.some((value) => value < minNumber || value > maxNumber);

  // 목록에서 숫자 범위
  const userInput = ['1', '2', '3', '77', '5', '6', '7'];
  expect(hasOutRangeNumber(userInput, 1, 45)).toBe(true);
});

it('당첨 번호는 6자리 + 보너스 번호 1자리로, 총 7자리여야 한다.', () => {
  const isDiffArrayLength = (list, count) => list.length !== count;

  const userInput = ['1', '2', '3', '4', '5', '6'];
  expect(isDiffArrayLength(userInput, 7)).toBe(true);
});

it('당첨 번호는 중복된 숫자들을 가질 수 없다.', () => {
  const hasDuplicateItem = (list) => list.length !== new Set(list).size;

  const userInput = ['1', '1', '3', '4'];
  expect(hasDuplicateItem(userInput)).toBe(true);
});
