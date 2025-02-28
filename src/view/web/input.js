import { openModal } from "../../domain/web/modal";
import {
  validateBonusNumber,
  validatePrice,
  validateWinningNumbers,
} from "../../utils/validate/Validator";

const printErrorMessage = (errorField, error) => {
  const prevErrorMessage = document.querySelector(
    `${errorField} .error-message`
  );
  if (prevErrorMessage) {
    prevErrorMessage.innerText = error.message;
    return;
  }
  const errorFieldBlock = document.querySelector(errorField);
  const errorMessage = document.createElement("p");
  errorMessage.className = "error-message";
  errorMessage.innerText = error.message;
  errorFieldBlock.appendChild(errorMessage);
};

// error 메시지 지우는 함수
const removeErrorField = (errorField) => {
  const prevErrorMessage = document.querySelector(
    `${errorField} .error-message`
  );
  if (prevErrorMessage) {
    prevErrorMessage.remove();
  }
};

// price 입력받기
const repeatGetPrice = (resolve) => {
  const userInputPrice = document.querySelector(".input-contents input").value;

  try {
    validatePrice(userInputPrice);
    removeErrorField(".input-contents");
    openModal();
    resolve(userInputPrice);
  } catch (error) {
    printErrorMessage(".input-contents", error);
  }
};

const getPrice = () => {
  return new Promise((resolve) => {
    const purchaseButton = document.querySelector(".input-contents button");
    purchaseButton.addEventListener("click", async () => {
      repeatGetPrice(resolve);
    });
  });
};

// winningLotto 입력받기
const getWinningNumber = () => {
  const winningNumbers = [];
  document
    .querySelectorAll(".winningLotto-contents_winningLotto div input")
    .forEach((winningNumber) => {
      winningNumbers.push(winningNumber.value);
    });

  return winningNumbers;
};

const getBonusNumber = () => {
  return document.querySelector(".winningLotto-contents_bonusNumber input")
    .value;
};

const parseNumber = (winningNumbers, bonusNumber) => {
  winningNumbers = winningNumbers.map((winningNumber) => Number(winningNumber));
  bonusNumber = Number(bonusNumber);
  return { winningNumbers, bonusNumber };
};

const repeatWinningLotto = (resolve) => {
  const winningNumbers = getWinningNumber();
  const bonusNumber = getBonusNumber();

  try {
    validateWinningNumbers(winningNumbers);
    validateBonusNumber(winningNumbers, bonusNumber);
    removeErrorField(".winningLotto-contents");
    resolve(parseNumber(winningNumbers, bonusNumber));
  } catch (error) {
    printErrorMessage(".winningLotto-contents", error);
  }
};

const getWinningLotto = async () => {
  const submitResultButton = document.querySelector(".result-contents");

  return new Promise((resolve) => {
    submitResultButton.addEventListener("click", async () => {
      repeatWinningLotto(resolve);
    });
  });
};

export { getPrice, getWinningLotto };
