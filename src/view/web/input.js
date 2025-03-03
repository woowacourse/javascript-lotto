import { allowWinningLotto } from "./modal";
import { focusInput } from "./setup";
import {
  validateBonusNumber,
  validatePrice,
  validateWinningNumbers,
} from "../../utils/validate/Validator";

const printErrorMessage = (errorField, error) => {
  const prevErrorMessage = $(`${errorField} .error-message`);
  if (prevErrorMessage.length) {
    prevErrorMessage.text(error.message);
    return;
  }

  const $errorFieldBlock = $(errorField);
  const $errorMessage = $("<p>").addClass("error-message").text(error.message);
  $errorFieldBlock.append($errorMessage);
};

// error 메시지 지우는 함수
const removeErrorField = (errorField) => {
  const $prevErrorMessage = $(errorField).find(".error-message");
  if ($prevErrorMessage.length) {
    $prevErrorMessage.remove();
  }
};

// price 입력받기
const repeatGetPrice = () => {
  const userInputPrice = $(".input-contents input").val();

  try {
    validatePrice(userInputPrice);
    removeErrorField(".input-contents");
    allowWinningLotto();
    focusInput(".winningLotto-contents_winningLotto input");
    return userInputPrice;
  } catch (error) {
    printErrorMessage(".input-contents", error);
    return "";
  }
};

// winningLotto 입력받기
const getWinningNumber = () => {
  const winningNumbers = [];
  $(".winningLotto-contents_winningLotto div input").each(function () {
    winningNumbers.push($(this).val());
  });

  return winningNumbers;
};

const getBonusNumber = () => {
  return $(".winningLotto-contents_bonusNumber input").val();
};

const parseNumber = (winningNumbers, bonusNumber) => {
  winningNumbers = winningNumbers.map((winningNumber) => Number(winningNumber));
  bonusNumber = Number(bonusNumber);
  return { winningNumbers, bonusNumber };
};

const repeatWinningLotto = () => {
  const winningNumbers = getWinningNumber();
  const bonusNumber = getBonusNumber();

  try {
    validateWinningNumbers(winningNumbers);
    validateBonusNumber(winningNumbers, bonusNumber);
    removeErrorField(".winningLotto-contents");
    return parseNumber(winningNumbers, bonusNumber);
  } catch (error) {
    printErrorMessage(".winningLotto-contents", error);
    return "";
  }
};

export { repeatGetPrice, repeatWinningLotto };
