import readline from "readline";

if (typeof window !== 'undefined') {
  throw new Error("readLineAsync는 브라우저 환경에서 사용할 수 없습니다.");
}

export const readLineAsync = (query = "") => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      resolve(input);
    });
  });
};
