describe("로또 번호 자동 생성 테스트", () => {

  it("로또 1장은 6개의 번호를 가진다.", () => {
    const lotto = new Lotto();
    expect(lotto.numbers).toHaveLength(6);
  });

  it("로또의 각 번호는 1 이상, 45 이하의 정수다.", () => {
    const lotto = new Lotto();
    lotto.numbers.forEach((number) => {
      expect(Number.isInteger(number)).toBeTruthy();
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(45);
    })
  });
 
  it("로또의 각 번호는 중복되지 않아야 한다.", () => {
    const lotto = new Lotto();
    lotto.numbers.forEach((number) => {
      expect(lotto.numbers.indexOf(number) === lotto.numbers.lastIndexOf(number)).toBeTruthy();
    })
  });

});