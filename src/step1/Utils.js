/**
 * 
 * 두 수를 포함하는 두 수 사이의 정수 난수 배열 반환.
 * @param {Number} min 
 * @param {Number} max 
 * @param {Number} range 
 * @returns {number[]}
 */
export function pickNumberInRange(min, max, range) {
  if (max - min + 1 < range) {
    throw new Error('반환할 난수의 갯수가 범위 내 숫자 수 보다 많습니다.');
  }
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  const numbers = new Set();
  while (true) {
    if (numbers.size === range) {
      break;
    }
    const randomNumber = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    numbers.add(randomNumber);
  }

  return [...numbers];
}


export async function reReadUntilSuccess(read) {
  while (true) {
    try {
      const answer = await read();
      return answer;
    } catch (err) {
      console.log(`[ERROR] ${err.message}`);
    }
  }
}
