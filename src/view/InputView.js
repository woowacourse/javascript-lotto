import readline from 'readline';

export default function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error('arguments must be 1'));
    }

    if (typeof query !== 'string') {
      reject(new Error('query must be string'));
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      resolve(input);
    });
  });
}

// // 입출력 예시
// async function run() {
//   const name = await readLineAsync('자동차 이름을 입력하세요 > ');
//   console.log(`자동차 이름은 ${name}입니다.`);
// }
