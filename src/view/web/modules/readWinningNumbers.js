import calculatePrizeResult from "../../../lotto/calculatePrizeResult.js";
import getTotalPrizeMoney from "../../../lotto/getTotalPrizeMoney.js";
import { getRevenueRate } from "../../../utils/math.js";
import {
  validateBonusNumber,
  validateWinningNumbers,
} from "../../../validation/index.js";
import createPrizeTable from "../layers/modal/createPrizeTable.js";
import createRevenueRateMessage from "../layers/modal/createRevenueRateMessage.js";

const readWinningNumbers = (lottoNumbers, lottoPrice) => {
  const numbersForm = document.getElementById("winningLotto-numbersInput-form");

  numbersForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const winningNumbers = Array.from(
      document.querySelectorAll(".winningLotto-winningNumbers"),
    ).map((number) => Number(number.value));

    const bonusNumber = document.getElementById(
      "winningLotto-bonusNumber",
    ).value;

    const { validWinningNumbers, validBonusNumber } = checkNumbers(
      winningNumbers,
      bonusNumber,
    );

    const result = calculatePrizeResult(
      lottoNumbers,
      validWinningNumbers,
      validBonusNumber,
    );

    const totalPrizeMoney = getTotalPrizeMoney(result);
    const revenueRate = getRevenueRate(totalPrizeMoney, lottoPrice);

    createPrizeTable(result);
    createRevenueRateMessage(revenueRate);
  });
};

const checkNumbers = (winningNumbers, bonusNumber) => {
  try {
    const parsedBonusNumber = Number(bonusNumber);
    validateWinningNumbers(winningNumbers);
    validateBonusNumber(parsedBonusNumber, winningNumbers);
    return {
      validWinningNumbers: winningNumbers,
      validBonusNumber: parsedBonusNumber,
    };
  } catch (error) {
    alert(error.message);
  }
};

export default readWinningNumbers;
