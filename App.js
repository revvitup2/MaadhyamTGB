import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import SignInForm from './pages/SignInForm';
import SignUpForm from './pages/SignUpForm';
import Home from './pages/Home';
import './App.css';
import { AuthProvider } from './Auth';
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
      <AuthProvider>
      <HashRouter basename="/react-auth-ui/">
        <div className="App">
            <div className="App__Form">
              <div className="Header">
                  <h2>XYZ</h2>
              </div> 
                <Route path="/login" component={SignInForm}>
                </Route>
                <Route path="/signup" component={SignUpForm}>
                </Route>
                <PrivateRoute path ="/" component={Home}/>
              </div>
        </div>
      </HashRouter>
      </AuthProvider>
    );
  }


export default App;
