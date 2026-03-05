export const stringToNumber = (userInput) => {
  return Number(userInput);
};
export const stringToNumberArray = (userInput) => {
  return userInput.split(",").map((input) => Number(input));
};
export const capitalToSmall = (userInput) => {
  return userInput.toLowerCase().trim();
};
