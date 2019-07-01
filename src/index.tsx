import './style.less';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component<any, any> {
  render() {
    return 'Hello World';
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
