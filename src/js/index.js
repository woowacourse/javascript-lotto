import Model from './Model/Model.js';
import View from './View/View.js';
import Controller from './Controller/Controller.js';
import { $ } from './utils/utils.js';

const model = new Model();
const view = new View($('#app'));
const controller = new Controller(model, view);

controller.init();
