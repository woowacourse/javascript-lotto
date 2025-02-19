export const printLottoCount = (count) => {
  console.log(`${count}개를 구매했습니다.`);
};

export const printLottoNumbers = (numbers) => {
  console.log(numbers);
};

export const printResult = (resultCount) => {
  console.log("\n당첨 통계");
  console.log("---------");
  console.log(`3개 일치 (5,000원) - ${resultCount[5]}개`);
  console.log(`4개 일치 (50,000원) - ${resultCount[4]}개`);
  console.log(`5개 일치 (1,500,000원) - ${resultCount[3]}개`);
  console.log(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${resultCount[2]}개`);
  console.log(`6개 일치 (2,000,000,000원) - ${resultCount[1]}개`);
};
