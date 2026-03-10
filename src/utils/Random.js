const Random = {
  randomArray: (startNum, endNum, count) => {
    // 랜덤 숫자 뽑기
    let randomArray = [];
    for (let i = 0; i < count; i++) {
      const randomNum =
        startNum + Math.floor(Math.random() * (endNum - startNum + 1));
      if (randomArray.indexOf(randomNum) === -1) randomArray.push(randomNum);
      else i--;
    }
    // 오름차순 정렬
    randomArray.sort((a, b) => a - b);

    return randomArray;
  },
};

export default Random;
