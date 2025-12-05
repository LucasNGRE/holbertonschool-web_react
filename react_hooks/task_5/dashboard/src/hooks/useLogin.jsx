import { useState, useEffect } from 'react';

export default function useLogin(onLogin) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);

  // Validate email format
  const isValidEmail = (value) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  useEffect(() => {
    if (isValidEmail(email) && password.length >= 8) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [email, password]);

  // Handle email input
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handle password input
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (enableSubmit && typeof onLogin === 'function') {
      onLogin(email, password);
    }
  };

  return {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  };
}
