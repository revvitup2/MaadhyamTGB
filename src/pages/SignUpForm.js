import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import app from "../firebase";

const SignUpForm = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
      var id = app.auth().currentUser.uid;
      app.database().ref('users/' + id).set({
      uid : id,
      email: email.value,
      password: password.value
    });
    console.log(id);
      localStorage.setItem('Uid', id);
      window.location.assign("/data");
      
    } catch (error) {
      alert(error);
    }
  }, [history]);
    
        return (
          <div>
            <div className="PageSwitcher">
                  <NavLink to="/login" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                  <NavLink exact to="/signup" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                </div>
                <div className="FormCenter">
            <form onSubmit={handleSignUp} className="FormFields">
            <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password"/>
              </div>
              <div className="FormField">
                  <button className="FormField__Button mr-20" type="submit">Sign Up</button>
              </div>
            </form>
          </div>
          </div>
        );
    }

export default withRouter(SignUpForm);
