export function getRandomLotto() {
  const lottoList = [];

  for (let j = 0; j < 6; j++) {
    lottoList[j] = Math.floor(Math.random() * 45 + 1);
  }

  return lottoList;
}
