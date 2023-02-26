const Utils = {
  convertStringToNumber(strings) {
    const numbers = strings.map(Number);
    return numbers;
  },

  convertToLowerCase(string) {
    return string.toLowerCase();
  },

  getBenefitRate(totalBenefit, buyMoney) {
    return Math.round((totalBenefit / buyMoney) * 100) / 100;
  },
};

export default Utils;
