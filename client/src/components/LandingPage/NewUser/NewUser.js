import React, { useRef, useState } from 'react';
import './NewUser.css';
import defaultAvatar from '../../../assets/images/basic_avatar.png';

const NewUser = (props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [imgFile, setImgFile] = useState(null);
  // Step 1 Refs
  const emailRef = useRef(props.email);
  const passwordRef = useRef('');
  // Step 2 Refs
  const firstNameRef = useRef('');
  const lastNameRef = useRef('');
  // Step 3 Refs
  const usernameRef = useRef('');

  const fileUploadHandler = (e) => {
    setImgFile(URL.createObjectURL(e.target.files[0]));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (currentStep >= 3) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const firstName = firstNameRef.current.value;
      const lastName = lastNameRef.current.value;
      const username = usernameRef.current.value;
      return;
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className='new_user__page'>
      <div className='new_user__header'>
        <h1 className='header_brand'>GAMEFLIX</h1>
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
                ? 'Create an account now to create your personal collection of games!'
                : currentStep == 2
                ? 'Enter your first and last name in the inputs below'
                : 'Last step is to create a main profile! Enter username and profile picture below!'}
            </h1>
          </div>
          <form className='new_user__form' onSubmit={formSubmitHandler}>
            {/* STEP ONE INPUTS */}
            {currentStep == 1 && (
              <>
                <input
                  ref={emailRef}
                  className='form_text_input'
                  type='email'
                  defaultValue={props.email}
                />
                <span className='form_placeholder__email'>Email</span>
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
                <input ref={firstNameRef} className='form_text_input' />
                <span className='form_placeholder__first_name'>First Name</span>
                <input ref={lastNameRef} className='form_text_input' />
                <span className='form_placeholder__last_name'>Last Name</span>
              </>
            )}
            {/* STEP THREE INPUTS */}
            {currentStep == 3 && (
              <>
                <div className='form_file_container'>
                  <div
                    className='form_file'
                    style={{
                      backgroundImage: `url(${defaultAvatar})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center center',
                    }}
                  >
                    <input
                      onChange={fileUploadHandler}
                      className='form_file_input'
                      type='file'
                    />
                    <img src={imgFile} />
                  </div>
                </div>
                <input
                  style={{ margin: '10px 0' }}
                  ref={usernameRef}
                  className='form_text_input'
                />
                <span className='form_placeholder__username'>Username</span>
              </>
            )}
            <button>{currentStep !== 3 ? 'Next' : 'Submit'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
