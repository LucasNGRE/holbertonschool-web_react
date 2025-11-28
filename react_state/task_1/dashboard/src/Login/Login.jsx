import WithLogging from '../HOC/WithLogging';
import React, { Component } from 'react';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
    isLoggedIn: false,
    email: '', 
    password: '',
    enableSubmit: false,
    };
  }

  handleLoginSubmit = (event) => {
  event.preventDefault(); // très important pour empêcher le rechargement de la page
  this.setState({ isLoggedIn: true });
  console.log("Form submitted, isLoggedIn:", this.state.isLoggedIn);
  }

    handleChangeEmail = (e) => {
    this.setState({ email: e.target.value }, this.updateEnableSubmit);
  }

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value }, this.updateEnableSubmit);
  }

  updateEnableSubmit = () => {
  const { email, password } = this.state;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 8;

  this.setState({ enableSubmit: isEmailValid && isPasswordValid });
}



  render() {
  return (
    <div className="
      App-body
      flex
      flex-col
      p-5
      pl-1
      h-[45vh]
      border-t-4
      border-[color:var(--main-color)]
      max-[912px]:h-auto
      max-[912px]:p-4
    ">
      <p className="text-xl mb-4 max-[520px]:text-lg">
        Login to access the full dashboard
      </p>

      {/* Formulaire autour des inputs */}
      <form
        className="
          text-lg
          flex
          flex-col
          sm:flex-row
          sm:items-center
          gap-3
          sm:gap-0
          max-[520px]:gap-4
        "
        onSubmit={this.handleLoginSubmit} // fonction de submit
      >
        <label htmlFor="email" className="sm:pr-2">
          Email
        </label>

        <input
          type="email"
          name="user_email"
          id="email"
          value={this.state.email}                  // controlled component
          onChange={this.handleChangeEmail}        // mise à jour du state
          className="
            border
            rounded
            w-3/5
            sm:w-auto
            px-2
            py-1
            max-[520px]:w-full
          "
        />

        <label htmlFor="password" className="sm:pl-2 sm:pr-2">
          Password
        </label>

        <input
          type="password"
          name="user_password"
          id="password"
          value={this.state.password}              // controlled component
          onChange={this.handleChangePassword}    // mise à jour du state
          className="
            border
            rounded
            w-3/5
            sm:w-auto
            px-2
            py-1
            max-[520px]:w-full
          "
        />

        {/* Submit input activé uniquement quand enableSubmit est true */}
        <input
          type="submit"
          value="OK"
          disabled={!this.state.enableSubmit}
          className="
            cursor-pointer
            border
            px-1
            rounded
            sm:ml-2
            w-fit
            max-[520px]:self-start
            max-[520px]:mt-2
          "
        />
      </form>
    </div>
  );
}

}

const LoginWithLogging = WithLogging(Login);
export default LoginWithLogging;
