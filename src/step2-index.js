import App from "./app.js";
import WebInput from "./view/WebInput.js";
import WebOutput from "./view/WebOutput.js";

const app = new App({
  input: new WebInput(),
  output: new WebOutput(),
});
app.run();
