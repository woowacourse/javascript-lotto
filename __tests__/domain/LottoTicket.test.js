describe('로또 티켓', () => {
  describe('랜덤 값을 뽑는 기능 테스트', () => {
    test('랜덤 값이 중복 없이 6개 뽑히는지 확인한다.', () => {
      const lottoTicket = new LottoTicket();
      const uniqueNumbers = new Set(lottoTicket.getLottoNumbers);
      expect(uniqueNumbers.size).toHaveLength(6);
    });

    test('1 ~ 45 범위의 숫자가 뽑히는 확인한다.', () => {
      const lottoTicket = new LottoTicket().getLottoNumbers;

      expect(
        lottoTicket.every((lottoNumber) => lottoNumber >= 1 && lottoNumber <= 45),
      ).toBeTruthy();
    });
  });
  describe('로또 번호 오름차순 정리 기능 테스트', () => {
    test('로또 번호가 오름차순으로 정리되는지 확인한다.', () => {
      const lottoTicket = new LottoTicket().getLottoNumbers;
      const sorttedLottoTicket = lottoTicket.sort(
        (prevLottoNumber, nextLottoNumber) => prevLottoNumber - nextLottoNumber,
      );

      expect(lottoTicket).toEqual(sorttedLottoTicket);
    });
  });
});
