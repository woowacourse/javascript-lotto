import { AMOUNT } from "../constants/lottoConstants.js";

const lottoStatistics = (results) => {
  return Object.keys(results).reduce((total, key) => {
    return total + AMOUNT[key] * results[key];
  }, 0);
};

export default lottoStatistics;
