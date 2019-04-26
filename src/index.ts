import './style.less';

class App {
  constructor() {}

  run() {
    document.querySelector('#root').innerHTML = '<h3>Hello World!</h3>';
  }
}

new App().run();
