export default function returnOnInvestment(money, totalMatchResult) {
  const PRIZE = [5000, 50000, 1500000, 30000000, 2000000000];
  // const moneyAmount = money.amount;

  // const profit = totalMatchResult.reduce((totalProfit, matchCount, idx) => {
  //   return (totalProfit += matchCount * PRIZE[idx]);
  // }, 0);

  const totalMatchResultArray = Array.from(totalMatchResult);
  totalMatchResultArray.forEach(arr => {
    // console.log(arr[1].get('matchCount'));
    console.log(arr);
  });

  // const roi = 100 + ((profit - moneyAmount) / moneyAmount) * 100;
  // return parseFloat(roi.toFixed(2));
}
