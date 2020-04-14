import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Signin from './pages/Sigin';
import { auth } from './services/firebase';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route 
      {...rest}
      render={(props) => authenticated === true ? <Component {...props}/> :
      <Redirect to={{ pathname: '/login', state: { from: props.location}}} /> }
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest}){
  return(
    <Route
      {...rest}
      render={(props) => authenticated === false ? <Component {...props} />
      : <Redirect to='/chat' />}
    />
  )
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
      hasError: false,
    };
  }


  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      }
      else{
        this.setState({
          authenticated:false,
          loading: false,
        });
      }
    }) 
  }

render() {
  if(this.state.hasError){
    return (
      <h1>Something went wrong here :(</h1>
    );
  }
  else{
    return this.state.loading === true ? <h2>Loading Page...</h2> : (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
         <PrivateRoute path="/chat" authenticated={this.state.authenticated} component={Chat}></PrivateRoute>
          <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup}></PublicRoute>
         <PublicRoute path="/signin" authenticated={this.state.authenticated} component={Signin}></PublicRoute>
        </Switch>
     </Router>
    );
  }
}
}

export default App;
