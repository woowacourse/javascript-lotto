import UniquePositivesPicker from "../UniquePositivesPicker";

const getNumberGenerateFunctionFromArray = (array) => {
  const closureArray = array;
  return () => closureArray.shift();
};

describe("UniquePositivePikcer 유닛 테스트", () => {
  test("중복된 값이 생성된 경우 다시 값을 생성한다.", () => {
    //Arrange
    const arrayLength = 100;
    const pickCount = 10;
    const array = Array.from({ length: arrayLength - 3 }).map((_, i) => i);
    array.unshift(4, 5);
    const numberGenerateFunction = getNumberGenerateFunctionFromArray(array);
    const uniquePositivesPicker = new UniquePositivesPicker(
      numberGenerateFunction,
      arrayLength
    );

    //Act
    const result = uniquePositivesPicker.getUniquePositiveIntegers(pickCount);

    //Assert
    expect(result).toEqual([4, 5, 0, 1, 2, 3, 6, 7, 8, 9]);
  });

  test("여러 번 함수를 사용하더라도 전에 반환되었던 값이 나올 수 있다", () => {
    //Arrange
    const arrayLength = 100;
    const pickCount = 3;
    const unUniquePositive = [
      1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1,
      2, 3,
    ];
    const array = Array.from({
      length: arrayLength - unUniquePositive.length,
    }).map((_, i) => i);
    array.unshift(...unUniquePositive);
    const numberGenerateFunction = getNumberGenerateFunctionFromArray(array);
    const uniquePositivesPicker = new UniquePositivesPicker(
      numberGenerateFunction,
      arrayLength
    );

    //Act
    const result1 = uniquePositivesPicker.getUniquePositiveIntegers(pickCount);
    const result2 = uniquePositivesPicker.getUniquePositiveIntegers(pickCount);
    const result3 = uniquePositivesPicker.getUniquePositiveIntegers(pickCount);
    const result4 = uniquePositivesPicker.getUniquePositiveIntegers(pickCount);
    const result5 = uniquePositivesPicker.getUniquePositiveIntegers(pickCount);

    //Assert
    expect(result1).toEqual(result2);
    expect(result2).toEqual(result3);
    expect(result3).toEqual(result4);
    expect(result4).toEqual(result5);
  });
});
