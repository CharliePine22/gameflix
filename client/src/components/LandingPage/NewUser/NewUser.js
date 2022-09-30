import React, { useRef, useState, useEffect } from 'react';
import defaultAvatar from '../../../assets/images/basic_avatar.png';
import { TwitterPicker } from 'react-color';
import axios from 'axios';
import './NewUser.css';

const NewUser = (props) => {
  const baseURL = process.env.REACT_APP_BASE_URL;

  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState(false);

  // Color Picker States
  const [color, setColor] = useState('');

  // Step 1 Refs
  const [stepOneData, setStepOneData] = useState({});
  const emailRef = useRef('');
  const passwordRef = useRef('');
  // Step 2 Refs
  const [stepTwoData, setStepTwoData] = useState({});
  const firstNameRef = useRef('');
  const lastNameRef = useRef('');
  // Step 3 Refs
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  const fileUploadHandler = (e) => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    setImgFile(e.target.files[0]);
  };

  const colorChangeHandler = (color) => setColor(color);

  // Handler to go back and edit forms in previous steps
  const backStepHandler = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    if (error) emailRef.current.focus();
  }, []);

  const validateEmail = (data) => {
    let flag = false;
    const request = axios
      .post(`${baseURL}/app/signup`, data)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        setError(e.response.data.message);
        flag = true;
      });

    return request;
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    // Go throuh the steps until user gets to last step (3), then submit data
    // Step 1
    if (currentStep == 1) {
      const email = emailRef.current.value.trim();
      const password = passwordRef.current.value.trim();
      if (email == '' || !email.includes('@')) {
        setError('Please enter a valid email');
      } else if (password == '' || password.length > 10) {
        setError(
          'Please enter a valid password that is 10 characters or less!'
        );
      } else {
        setStepOneData({ email, password });
        setCurrentStep(currentStep + 1);
        setError(false);
      }
    }
    // Step 2
    else if (currentStep == 2) {
      const firstName = firstNameRef.current.value;
      const lastName = lastNameRef.current.value;
      if (firstName.trim() == '' || lastName.trim() == '') {
        setError("Please don't leave name fields empty!");
      } else {
        setStepTwoData({ firstName, lastName });
        setCurrentStep(currentStep + 1);
        setError(false);
      }
    }
    // Step 3
    else {
      const formData = new FormData();
      formData.append('firstName', stepTwoData.firstName);
      formData.append('lastName', stepTwoData.lastName);
      formData.append('email', stepOneData.email);
      formData.append('password', stepOneData.password);
      formData.append('color', color.hex);
      formData.append('avatar', imgFile);

      const result = await validateEmail(formData);
      console.log(result);

      if (!error && !result.data.message && result !== null) {
        localStorage.setItem('user', JSON.stringify(result.data));
        window.location.reload();
      } else {
        console.log('issue');
        setCurrentStep(1);
        emailRef.current.value = stepOneData.email;
        setError(null);
      }
    }
  };

  return (
    <div className='new_user__page'>
      <div className='new_user__header'>
        <h1 className='header_brand' onClick={() => props.returnToLanding()}>
          GAMEFLIX
        </h1>
        <button className='header_btn'>Sign In</button>
      </div>

      <div className='new_user__forms_container'>
        <div className='new_user__forms'>
          <p className='forms_step'>
            STEP <span className='bold'>{currentStep}</span> OF{' '}
            <span className='bold'>3</span>
          </p>
          <div className='forms_info'>
            <h1 className='info_title'>
              {currentStep == 1
                ? 'Start now by creating an account to gain acess to your personal collection of games!'
                : currentStep == 2
                ? 'Tell us a little more about yourself, enter your first and last name in the boxes below!'
                : 'Click the image below to set your profile picture and select your favorite color!'}
            </h1>
          </div>
          <form
            className='new_user__form'
            style={{ alignItems: currentStep >= 3 && 'center' }}
            onSubmit={formSubmitHandler}
            encType='multipart/form-data'
          >
            {/* STEP ONE INPUTS */}
            {currentStep == 1 && (
              <>
                <input
                  ref={emailRef}
                  className={`form_text_input ${error && 'input_error'}`}
                  type='email'
                  onBlur={() => error && setError(null)}
                  defaultValue={!error ? props.email : stepOneData.email}
                />
                <span className='form_placeholder__email'>Email</span>
                {error && <p className='user_email_error'>{error}</p>}
                <input
                  ref={passwordRef}
                  className='form_text_input'
                  type='password'
                />
                <span className='form_placeholder__password'>Password</span>
              </>
            )}
            {/* STEP TWO INPUTS */}
            {currentStep == 2 && (
              <>
                <input
                  ref={firstNameRef}
                  defaultValue={stepTwoData?.firstName}
                  className='form_text_input'
                />
                {error && <p className='step_two__error'>{error}</p>}
                <span className='form_placeholder__first_name'>First Name</span>
                <input
                  ref={lastNameRef}
                  defaultValue={stepTwoData?.lastName}
                  className='form_text_input'
                />
                <span className='form_placeholder__last_name'>Last Name</span>
              </>
            )}
            {/* STEP THREE INPUTS */}
            {currentStep >= 3 && (
              <>
                <div className='form_file_container'>
                  <div
                    className='form_file'
                    style={{
                      backgroundImage: `url(${
                        imgFile == null ? defaultAvatar : imgPreview
                      })`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center center',
                      backgroundColor: color.hex,
                    }}
                  >
                    <input
                      onChange={fileUploadHandler}
                      className='form_file_input'
                      type='file'
                    />
                    {/* <img src={imgPreview} /> */}
                  </div>
                  <div className='color_picker_container'>
                    <TwitterPicker
                      color={color}
                      onChangeComplete={colorChangeHandler}
                    />
                  </div>
                </div>
              </>
            )}
            <button
              className='form_actions_btn'
              type='submit'
              style={{ width: currentStep == 3 && '52%' }}
            >
              {currentStep !== 3 ? 'Next' : 'Submit'}
            </button>
            {currentStep !== 1 && (
              <button
                type='button'
                onClick={backStepHandler}
                className='form_back_btn'
              >
                Back
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
