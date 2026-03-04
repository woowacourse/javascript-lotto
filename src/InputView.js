import readline from "readline/promises";

async function getUserInput(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const input = await rl.question(message);
  rl.close();
  return input;
}

const InputView = {
  askAmount: async () => {
    const MESSAGE = "> 구입금액을 입력해 주세요. ";
    return await getUserInput(MESSAGE);
  },

  askWinningNumbers: async () => {
    const MESSAGE = "> 당첨 번호를 입력해 주세요. ";
    return await getUserInput(MESSAGE);
  },

  askBonusNumber: async () => {
    const MESSAGE = "> 보너스 번호를 입력해 주세요. ";
    return await getUserInput(MESSAGE);
  },

  askRetry: async () => {
    const MESSAGE = "> 다시 시작하시겠습니까? (y/n)";
    return await getUserInput(MESSAGE);
  },
};

export default InputView;
