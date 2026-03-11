import Header from "./components/Header/index.js";
import { createElement } from "./service/index.js";

const App = () => {
  return createElement("main", {}, Header());
};

export default App;
