const Utils = {
  convertStringToNumber(strings) {
    const numbers = strings.map((string) => {
      return Number(string);
    });
    return numbers;
  },

  getBenefitRate(totalBenefit, buyMoney) {
    return Math.round((totalBenefit / buyMoney) * 100) / 100;
  },
};

export default Utils;
