import App from "./App.js";
import { render } from "./service/index.js";

const app = document.querySelector("#app");

render(app, App());
