import React, { useState, useRef } from 'react';
import './Login.css';
import vgCollage from '../../assets/images/vg-collage.jpg';

const Login = ({ toLanding, authenticateUser }) => {
  // States
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [currentFocus, setCurrentFocus] = useState(null);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  document.body.style.overflow = 'hidden';

  // Refs
  const emailRef = useRef('');
  const passwordRef = useRef('');

  // Regex for email validity
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Email input error change error handler
  const checkEmailValidity = (e) => {
    if (hasEmailError) setHasEmailError(false);
    const value = e.target.value.trim().toLowerCase();
    const isValidEmail = re.test(value);
  };

  // Email input error blur error handler
  const emailBlurHandler = (e) => {
    const value = e.target.value.trim().toLowerCase();
    const isValidEmail = re.test(value);
    setHasEmailError(!isValidEmail);
    setCurrentFocus(null);
  };

  // Password input error change error handler
  const checkPasswordValidity = (e) => {
    if (hasPasswordError) setHasPasswordError(false);
    const value = e.target.value.trim().toLowerCase();
    const isValidPassword =
      e.target.value.length > 0 && e.target.value.length <= 8;
  };

  // Password input error blur error handler
  const passwordBlurHandler = (e) => {
    const value = e.target.value.trim().toLowerCase();
    const isValidPassword = value.length > 3 && value.length <= 8;
    setHasPasswordError(!isValidPassword);
    setCurrentFocus(null);
  };

  const toLandingPage = () => {
    toLanding();
  };

  // Submit user information to match authentication
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Data values
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    emailRef.current.blur();
    passwordRef.current.blur();
    setCurrentFocus('');
    const response = await authenticateUser(email, password);
    if (!response.data) setAuthError(response);
    setLoading(false);
  };

  return (
    <div className='login__wrapper'>
      <div className='login'>
        <div className='login__form_wrapper'>
          <div className='login__form_container'>
            <form className='login__form' onSubmit={formSubmitHandler}>
              {!loading ? (
                <>
                  <h1>LOGIN</h1>
                  <div className='login__form_actions'>
                    <label className='form_label' htmlFor='email' />
                    <input
                      ref={emailRef}
                      onFocus={() => setCurrentFocus('email')}
                      onChange={checkEmailValidity}
                      onBlur={emailBlurHandler}
                      className={`form_input ${
                        emailRef.current?.value !== '' && hasEmailError
                          ? 'error'
                          : ''
                      }`}
                      type='email'
                    />
                    <span
                      className={`form_actions_placeholder ${
                        emailRef.current?.value || currentFocus == 'email'
                          ? 'focused'
                          : ''
                      }`}
                    >
                      Email
                    </span>
                  </div>
                  <div className='login__form_actions'>
                    <label className='form_label' htmlFor='email' />
                    <input
                      ref={passwordRef}
                      onFocus={() => setCurrentFocus('password')}
                      onChange={checkPasswordValidity}
                      onBlur={passwordBlurHandler}
                      className={`form_input ${
                        passwordRef.current?.value !== undefined &&
                        hasPasswordError &&
                        passwordRef.current.value.length > 0
                          ? 'error'
                          : ''
                      }`}
                      type='password'
                    />
                    <span
                      className={`form_actions_placeholder ${
                        passwordRef.current?.value || currentFocus == 'password'
                          ? 'password_focused'
                          : ''
                      }`}
                    >
                      Password
                    </span>
                    {authError && (
                      <p className='login__auth_error'>{authError}</p>
                    )}
                  </div>
                  <button className='form__submit_btn'>Sign In</button>
                  <p className='form__create_account'>
                    Don't have an account?{' '}
                    <span onClick={toLandingPage}>Create one now</span>.
                  </p>
                </>
              ) : (
                <div className='login__loading'>
                  <div className='loading_spinner' />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className='login__background'>
        <img src={vgCollage} />
        {/* {images.map((game) => (
          <React.Fragment key={game.key}>
            <img
              className='login__img'
              alt={game.name}
              src={game.props.children.props.src}
            />
          </React.Fragment>
        ))} */}
      </div>
    </div>
  );
};

export default Login;
