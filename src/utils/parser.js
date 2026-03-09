export const parseStringToNumber = (userInput) => {
  return Number(userInput);
};
export const parseStringToNumberArray = (userInput) => {
  return userInput.split(",").map((input) => Number(input));
};
export const parseCapitalToSmall = (userInput) => {
  return userInput.toLowerCase().trim();
};
