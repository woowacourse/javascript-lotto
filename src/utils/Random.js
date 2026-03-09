const random = {
  randomArray: (startNum, endNum, count) => {
    // 무한루프 방지 로직
    if (count > endNum - startNum + 1) return;

    // 랜덤 숫자 뽑기
    let randomArray = [];
    for (let i = 0; i < count; i++) {
      const randomNum =
        Math.floor(Math.random() * (endNum - startNum + 1)) + startNum;
      if (randomArray.indexOf(randomNum) === -1) randomArray.push(randomNum);
      else i--;
    }
    // 오름차순 정렬
    randomArray.sort((a, b) => a - b);

    return randomArray;
  },
};

export default random;
