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
import axios from 'axios';

/* axios公共配置 */
axios.defaults.baseURL = __BASE_URL__; //请求baseUrl
axios.defaults.timeout = 60000; //设置超时时间
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

//response拦截器
axios.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error);
  }
);

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
