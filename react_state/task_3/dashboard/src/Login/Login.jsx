import WithLogging from '../HOC/WithLogging';
import React, { Component } from 'react';

export class Login extends Component {
  constructor(props) {
    super(props);

    const { email = '', password = '' } = props;

    this.state = {
      email,
      password,
      enableSubmit: false,
    };

    // refs pour gérer le focus
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  // fonction pour activer/désactiver le submit
  updateEnableSubmit = () => {
    const { email, password } = this.state;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordValid = password.length >= 8;
    this.setState({ enableSubmit: emailValid && passwordValid });
  };

  handleChangeEmail = (e) => {
    const email = e.target.value;
    this.setState({ email }, this.updateEnableSubmit);
  };

  handleChangePassword = (e) => {
    const password = e.target.value;
    this.setState({ password }, this.updateEnableSubmit);
  };

  handleLoginSubmit = (event) => {
    event.preventDefault(); // empêche le rechargement de la page
    const { email, password } = this.state;
    if (this.props.logIn) {
      this.props.logIn(email, password);
    }
  };

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
          onSubmit={this.handleLoginSubmit}
        >
          <label htmlFor="email" onClick={() => this.emailRef.current?.focus()} className="sm:pr-2">
            Email
          </label>
          <input
            type="email"
            name="user_email"
            id="email"
            ref={this.emailRef}
            value={this.state.email}
            onChange={this.handleChangeEmail}
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

          <label htmlFor="password" onClick={() => this.passwordRef.current?.focus()} className="sm:pl-2 sm:pr-2">
            Password
          </label>
          <input
            type="password"
            name="user_password"
            id="password"
            ref={this.passwordRef}
            value={this.state.password}
            onChange={this.handleChangePassword}
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

          <button
            type="submit"
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
          >
            OK
          </button>
        </form>
      </div>
    );
  }
}

const LoginWithLogging = WithLogging(Login);
export default LoginWithLogging;

// default props to ensure email/password exist when not provided
Login.defaultProps = {
  email: '',
  password: '',
  logIn: () => {},
};
