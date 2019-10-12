import './style.less';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import loadable from 'react-loadable';
import Layout from './pages/layout';
import routes from './routes';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Layout>{this.renderRoute()}</Layout>
        </Switch>
      </Router>
    );
  }

  renderRoute = () => {
    return routes.map((item, i) => (
      <Route
        key={i}
        exact={item.exact}
        path={item.path}
        component={loadable({ loader: item.render, loading: () => <div /> })}
      />
    ));
  };
}

ReactDOM.render(<App />, document.getElementById('root'));
