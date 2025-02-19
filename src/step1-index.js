import { INPUT } from "./constants/message.js";
import Input from "./view/Input.js";

/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
const run = async () => {
  const price = Input.retry(async () => {
    const input = await Input.readLineAsync(INPUT.PRICE);
    const priceNumber = Number(input); // validation
    return priceNumber;
  });

  const winningLottoNumbers = Input.retry(async () => {
    const input = await Input.readLineAsync(INPUT.WINNER_NUMBERS);
    const winningNumbersArray = input.split(","); // validation
    return winningNumbersArray;
  });

  const bonusLottoNumber = Input.retry(async () => {
    const input = await Input.readLineAsync(INPUT.BONUS_NUMBER);
    const bonusNumber = Number(input); // validation
    return bonusNumber;
  });

  const retry = Input.retry(async () => {
    const input = await Input.readLineAsync(INPUT.RETRY);
    // validation
    return input;
  });
};

run();
