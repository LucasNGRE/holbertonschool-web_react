import { useState, useRef } from 'react';
import WithLogging from '../HOC/WithLogging';
import React from 'react';

export function Login(props) {
  const { email = '', password = '', logIn } = props;

  const [formData, setFormData] = useState({
    email,
    password,
  });

  const [enableSubmit, setEnableSubmit] = useState(false);

  // refs pour gérer le focus
  const emailRef = useRef();
  const passwordRef = useRef();

  // validation identique à la version classe
  const updateEnableSubmit = (emailValue, passwordValue) => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    const passwordValid = passwordValue.length >= 8;
    setEnableSubmit(emailValid && passwordValid);
  };

  const handleChangeEmail = (e) => {
    const emailValue = e.target.value;

    setFormData((prev) => {
      const updated = { ...prev, email: emailValue };
      updateEnableSubmit(updated.email, updated.password);
      return updated;
    });
  };

  const handleChangePassword = (e) => {
    const passwordValue = e.target.value;

    setFormData((prev) => {
      const updated = { ...prev, password: passwordValue };
      updateEnableSubmit(updated.email, updated.password);
      return updated;
    });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault(); // toujours empêcher le reload

    if (logIn) {
      logIn(formData.email, formData.password);
    }
  };

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
        onSubmit={handleLoginSubmit}
      >
        <label htmlFor="email" onClick={() => emailRef.current?.focus()} className="sm:pr-2">
          Email
        </label>
        <input
          type="email"
          name="user_email"
          id="email"
          ref={emailRef}
          value={formData.email}
          onChange={handleChangeEmail}
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

        <label htmlFor="password" onClick={() => passwordRef.current?.focus()} className="sm:pl-2 sm:pr-2">
          Password
        </label>
        <input
          type="password"
          name="user_password"
          id="password"
          ref={passwordRef}
          value={formData.password}
          onChange={handleChangePassword}
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
          disabled={!enableSubmit}
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

const LoginWithLogging = WithLogging(Login);
export default LoginWithLogging;

// default props
Login.defaultProps = {
  email: '',
  password: '',
  logIn: () => {},
};
