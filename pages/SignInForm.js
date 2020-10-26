import { AuthContext } from "../Auth.js";
import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import app from "../firebase.js";


  const SignInForm = ({ history }) => {
    const handleLogin = useCallback(
      async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
          await app
            .auth()
            .signInWithEmailAndPassword(email.value, password.value);
          history.push("/");
        } catch (error) {
          alert(error);
        }
      },
      [history]
    );
  
    const { currentUser } = useContext(AuthContext);
  
    if (currentUser) {
      return <Redirect to="/" />;
    }

  return(
    <div>
    <div className="PageSwitcher">
    <NavLink to="/login" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
    <NavLink exact to="/signup" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
  </div>
    <div className="FormCenter">
    <form className="FormFields" onSubmit={handleLogin}>
    <div className="FormField">
        <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
        <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email"/>
      </div>

      <div className="FormField">
        <label className="FormField__Label" htmlFor="password">Password</label>
        <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" />
      </div>

      <div className="FormField_But">
          <button className="FormField__Button mr-20" type="submit">Sign In</button><br/>
      </div>
    </form>
  </div>
  </div>
        )   
}

export default withRouter(SignInForm);
