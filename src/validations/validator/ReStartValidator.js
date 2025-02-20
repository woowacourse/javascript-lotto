import { YES } from "../../constants/constants.js";
import { NO } from "../../constants/constants.js";


export const reStartValidator = {
  isYesOrNo(input){
    return input===YES||input===NO;
  },
};