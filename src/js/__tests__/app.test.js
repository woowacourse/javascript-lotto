// - [] 구입할 금액을 입력할 수 있어야 한다
//   - [] 금액은 천 단위로 입력해야 한다
//   - [] 금액은 빈값으로 입력할 수 없다
//   - [] 금액은 음수를 입력할 수 없다
// - [] 구입한 로또 금액만큼 로또를 발급할 수 있어야 한다
//   - [] 발급 후 로또의 번호를 볼 수 없다
//   - [] 로또 한장의 가격은 1000원이다
//   - [] 로또의 번호는 자동으로 정해진다
//   - [] 로또의 번호는 중복없이 1이상 45이하이다
// - [] 구입한 로또 금액만큼 로또 개수를 확인할 수 있어야 한다
// - [] 번호 보기 토글 버튼을 클릭해 로또 번호를 볼 수 있어야 한다.

// e2e 테스트
// test('구입할 금액을 입력하면, 로또 구매 갯수를 확인할 수 있다.', () => {
//
// })

// unit 테스트
//   - [] 금액은 천 단위로 입력해야 한다 (validation)
//   - [] 금액은 빈값으로 입력할 수 없다 (validation)
//   - [] 금액은 음수를 입력할 수 없다 (validation)
//   - [] 로또 번호 생성 함수

function isDividedByThousand(purchaseMoney) {
  return purchaseMoney % 1000 === 0;
}

function isEmptyValue(purchaseMoney) {
  return !!purchaseMoney;
}

function isPositiveValue(purchaseMoney) {
  return purchaseMoney > 0;
}
test('금액은 천 단위로 입력해야 한다', () => {
  const purchaseMoney = 3000;

  expect(isDividedByThousand(purchaseMoney)).toBe(true);
});

test('금액은 빈값으로 입력할 수 없다 ', () => {
  const purchaseMoney = '';

  expect(isEmptyValue(purchaseMoney)).toBe(false);
});

test('금액은 양의 정수를 입력해야한다', () => {
  let purchaseMoney = -1000;
  expect(isPositiveValue(purchaseMoney)).toBe(false);
  purchaseMoney = 0;
  expect(isPositiveValue(purchaseMoney)).toBe(false);
})