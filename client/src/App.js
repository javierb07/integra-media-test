import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Sell from './pages/Sell';
import Invoices from './pages/Invoices';
import Products from './pages/Products';
import Clients from './pages/Clients';
import Employees from './pages/Employees';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './components/NavBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div id="page-body">
            <Switch>
              <Route path="/" component={Sell} exact />
              <Route path="/invoices" component={Invoices} />
              <Route path="/products" component={Products} />
              <Route path="/clients" component={Clients} />
              <Route path="/employees" component={Employees} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
