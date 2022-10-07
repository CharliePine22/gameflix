import React, { useEffect, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import axios from 'axios';

const AccountEditor = ({ closeAccountSettings, setLoggedUser }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const user = JSON.parse(localStorage.getItem('user'));
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');
  // EMAIL STATES
  const [emailValue, setEmailValue] = useState(user.email);
  const [newEmailValue, setNewEmailValue] = useState('');
  let repeatValue = '';
  const [changingEmail, setChangingEmail] = useState(false);
  // PASSWORD STATES
  const [passwordValue, setPasswordValue] = useState(user.password);
  const [hidePassword, setHidePassword] = useState(true);
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (hidePassword) {
      const hiddenPassword = user.password.replace(/./gi, '*');
      setPasswordValue(hiddenPassword);
    } else {
      setPasswordValue(user.password);
    }
  }, [hidePassword]);

  const updateEmail = async (email) => {
    setUpdateStatus('');
    try {
      const request = await axios.post(`${baseURL}/app/update_user_email`, {
        originalEmail: user.email,
        newEmail: email,
      });

      if (request.data.status < 400) {
        localStorage.setItem('user', JSON.stringify(request.data.user));
        setUpdateStatus({ type: 'success', message: request.data.message });
        setEmailValue(request.data.user.email);
        setNewEmailValue('');
        setLoggedUser(request.data.user);
        setChangingEmail(false);
      } else {
        setUpdateStatus({ type: 'error', message: request.data.message });
        setNewEmailValue('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const emailChangeHandler = () => {
    if (!changingEmail) {
      setChangingEmail(true);
      setChangingPassword(false);
    } else {
      if (newEmailValue !== '') {
        updateEmail(newEmailValue);
      } else {
        setChangingEmail(false);
        setNewEmailValue('');
      }
    }
  };

  const deleteAccountHandler = async () => {
    try {
      await axios.delete(`${baseURL}/app/delete_account`, {
        data: { id: user._id },
      });
      window.location = '/';
      localStorage.removeItem('user');
      localStorage.removeItem('profile');
    } catch (error) {
      console.log(error);
    }
  };

  const passwordChangeHandler = () => {
    if (!changingPassword) {
      setChangingPassword(true);
      setChangingEmail(false);
    } else {
      if (newPasswordValue !== '') {
        repeatValue = newEmailValue;
      } else {
        setChangingPassword(false);
        setNewPasswordValue('');
      }
    }
  };

  console.log(repeatValue);
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

  return (
    <div className='profile_edit__container'>
      <div className='profile_edit__header'>
        <h3>GAMEFLIX</h3>
      </div>
      <div className='profile_edit__form_wrapper' style={{ height: '350px' }}>
        <h3>Account Settings</h3>
        <div className='form_container'>
          <form className='account_edit__form'>
            {/* EMAIL CONTAINER */}
            <div className='account_email_container'>
              {updateStatus.type == 'error' ? (
                <p className='account_email_error'>{updateStatus.message}</p>
              ) : (
                <p className='account_email_success'>{updateStatus.message}</p>
              )}
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
                    onClick={() => {
                      setNewEmailValue('');
                      setChangingEmail(false);
                    }}
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
                    onClick={() => {
                      setNewPasswordValue('');
                      setChangingPassword(false);
                    }}
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
          <button
            className='delete_account_btn'
            onClick={() => setDeletingAccount(true)}
          >
            Delete Account
          </button>
        </div>
      </div>
      {deletingAccount && (
        <div className='delete_account_modal'>
          <div className='delete_account_modal_content'>
            <h4>Are you sure you want to delete your account?</h4>
            <div className='delete_account_modal_actions'>
              <div className='modal_action_option'>
                <p>Yes</p>
                <span
                  className='video-game-button'
                  onClick={deleteAccountHandler}
                >
                  A
                </span>
              </div>
              <div className='modal_action_option'>
                <p>No</p>
                <span
                  className='video-game-button'
                  onClick={() => setDeletingAccount(false)}
                >
                  B
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountEditor;
