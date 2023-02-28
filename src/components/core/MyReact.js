import { observable, observe } from './Observer';

function MyReact() {
  this.setup = () => {
    this.state = observable(this.initState());
    observe(() => {
      this.render();
      this.setEvent();
      this.mounted();
    });
  };

  this.initState = () => ({});
  this.template = () => '';
  this.render = () => {};
  this.setEvent = () => {};
  this.mounted = () => {};
}

export default MyReact;
