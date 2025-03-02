import { addBuyEventHandler } from "./eventHandler/buyHandler.js";
import { addModalCloseEventHandler } from "./eventHandler/modalHandler.js";
import { addModalRestartEventHandler } from "./eventHandler/restartHandler.js";
import { addResultEventHandler } from "./eventHandler/resultHandler.js";

addBuyEventHandler();
addResultEventHandler();
addModalRestartEventHandler();
addModalCloseEventHandler();
