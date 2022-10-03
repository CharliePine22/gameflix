import React, { useEffect, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import axios from 'axios';

const AccountEditor = ({ closeAccountSettings }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const user = JSON.parse(localStorage.getItem('user'));
  const [emailValue, setEmailValue] = useState(user.email);
  const [newEmailValue, setNewEmailValue] = useState('');
  const [changingEmail, setChangingEmail] = useState(false);

  const [passwordValue, setPasswordValue] = useState(user.password);
  const [hidePassword, setHidePassword] = useState(true);
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  const saveUserData = () => {};
  const cancelButtonHandler = () => {};

  const emailChangeHandler = () => {
    if (!changingEmail) {
      setChangingEmail(true);
      setChangingPassword(false);
    } else {
      setChangingEmail(false);
      setNewEmailValue('');
    }
  };

  const passwordChangeHandler = () => {
    if (!changingPassword) {
      setChangingPassword(true);
      setChangingEmail(false);
    } else {
      setChangingPassword(false);
      setNewPasswordValue('');
    }
  };

  const determineEmailValidity = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(`${baseURL}/app/update_user_profile`, {
        originalEmail: emailValue,
        newEmail: newEmailValue,
      });
      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(hidePassword);
    if (hidePassword) {
      const hiddenPassword = user.password.replace(/./gi, '*');
      console.log(hiddenPassword);
      setPasswordValue(hiddenPassword);
    } else {
      setPasswordValue(user.password);
    }
  }, [hidePassword]);

  return (
    <div className='profile_edit__container'>
      <div className='profile_edit__header'>
        <h3>GAMEFLIX</h3>
      </div>
      <div className='profile_edit__form_wrapper' style={{ height: '390px' }}>
        <h3>Account Settings</h3>
        <div className='form_container'>
          <form className='account_edit__form'>
            {/* EMAIL CONTAINER */}
            <div className='account_email_container'>
              <h4
                style={{ color: 'white', fontSize: '2rem', marginLeft: '2px' }}
              >
                Email
              </h4>
              <input
                className='account_email_input'
                onChange={(e) => setEmailValue(e.target.value)}
                value={emailValue}
              />

              {/* NEW EMAIL */}
              {changingEmail && (
                <>
                  <input
                    className='account_email_input'
                    onChange={(e) => setNewEmailValue(e.target.value)}
                    value={newEmailValue}
                    placeholder='Enter new email'
                    autoFocus
                  />
                  <button
                    type='button'
                    onClick={emailChangeHandler}
                    className='account_email_save_btn'
                  >
                    Cancel
                  </button>
                </>
              )}

              <button
                type='button'
                onClick={emailChangeHandler}
                className='save_btn'
              >
                {!changingEmail ? 'Change Email' : 'Save Email'}
              </button>
            </div>

            {/* PASSWORD CONTAINER */}
            <div className='account_password_container'>
              <h4
                style={{ color: 'white', fontSize: '2rem', marginLeft: '2px' }}
              >
                Password
              </h4>
              <input
                className='account_password_input'
                onChange={(e) => setPasswordValue(e.target.value)}
                value={passwordValue}
              />
              <span
                className='account_password_visible_icon'
                onClick={() => setHidePassword(!hidePassword)}
              >
                {!hidePassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>

              {/* NEW PASSWORD */}
              {changingPassword && (
                <>
                  <input
                    className='account_password_input'
                    onChange={(e) => setNewPasswordValue(e.target.value)}
                    value={newPasswordValue}
                    placeholder='Enter new password'
                    autoFocus
                  />
                  <button
                    type='button'
                    onClick={passwordChangeHandler}
                    className='account_password_save_btn'
                  >
                    Cancel
                  </button>
                </>
              )}
              <button
                type='button'
                onClick={passwordChangeHandler}
                className='save_btn'
              >
                {!changingPassword ? 'Change Password' : 'Save Password'}
              </button>
            </div>
          </form>
        </div>
        {/* FORM ACTIONS */}
        <div
          className='form_actions'
          style={{ justifyContent: 'space-between' }}
        >
          <button className='cancel_btn' onClick={closeAccountSettings}>
            Back
          </button>
          <button className='delete_account_btn' onClick={closeAccountSettings}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountEditor;
