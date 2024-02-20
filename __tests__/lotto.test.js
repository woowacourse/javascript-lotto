describe("Lotto 클래스 검사", () => {
  test.each([[[1, 2, 3, 4, 5, 6, 7]], [[1, 2, 3, 4, 5]]])(
    "Lotto 유효성 검사: 입렵받은 숫자가 6개가 아닐 때 에러 발생",
    (numbers) => {
      expect(() => new Lotto(numbers)).toThrow();
    }
  );

  test.each([[[1, 2, 3, 4, 5, 90]], [[0, 1, 2, 3, 4, 5]]])(
    "Lotto 유효성 검사: 1 ~ 45범위의 정수가 아닐 때, 에러 발생",
    (numbers) => {
      expect(() => new Lotto(numbers)).toThrow();
    }
  );

  test.each([[[1, 1, 3, 4, 5, 6, 7]], [[1, 2, 3, 4, 5, 5]]])(
    "Lotto 유효성 검사: 중복된 수가 있는 경우 있을 때, 에러 발생",
    (numbers) => {
      expect(() => new Lotto(numbers)).toThrow();
    }
  );
});
