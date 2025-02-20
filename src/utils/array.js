export const getIntersection = (array1, array2) => {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    throw new Error("인자가 배열이 아닙니다.");
  }

  const uniqueSet = new Set(array2);
  return array1.filter((value) => uniqueSet.has(value));
};

/**
 * 피셔 예이츠 셔플 사용
 * {@link https://ko.wikipedia.org/wiki/%ED%94%BC%EC%85%94-%EC%98%88%EC%9D%B4%EC%B8%A0_%EC%85%94%ED%94%8C}
 */
export const shuffle = (array) => {
  if (!Array.isArray(array)) {
    throw new Error("인자가 배열이 아닙니다.");
  }

  const copyArray = [...array];

  for (let i = copyArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
  }

  return copyArray;
};
