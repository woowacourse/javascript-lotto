describe('로또 당첨 번호 객체 테스트', () => {
  test.each([[[1, 2, 3, 4, 5, 6, 7]], [[1, 2, 3, 4]]])('당첨 번호가 6개가 아닌 경우 에러를 반환', (numbers) => {
    expect(() => {
      new WinningLotto(numbers);
    }).toThrow(ERROR_MESSAGES.incorrect_length);
  });
});
