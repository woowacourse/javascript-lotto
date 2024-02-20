describe('LottoProcess 클래스 검사', () => {
  test('당첨 번호와 로또 번호가 몇개 일치하는지 확인', () => {
    const lottos = [new Lotto([1, 2, 3, 4, 5, 6])];
    const winNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const lottoProcess = new LottoProcess(lottos);
    expect(lottoProcess.matchLottoNumbers(winNumbers)).toBe(6);
  });
});
