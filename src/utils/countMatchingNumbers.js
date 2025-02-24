const countMatchingNumbers = (numberArr1, numberArr2) => {
  const arr1 = [...numberArr1];
  const arr2 = [...numberArr2];

  //배열안의 내용이 숫자가 아닌경우 예외처리
  if (
    !arr1.every((element) => typeof element === "number") ||
    !arr2.every((element) => typeof element === "number")
  ) {
    throw new Error("숫자 배열이 아닙니다.");
  }

  return numberArr1.filter((element) => numberArr2.includes(element)).length;
};

export default countMatchingNumbers;
