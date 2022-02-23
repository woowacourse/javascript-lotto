import Model from './Model/Model.js';
import View from './View/View.js';
import Controller from './Controller/Controller.js';

const model = new Model();
const view = new View();
const controller = new Controller(model, view);

controller.init();
