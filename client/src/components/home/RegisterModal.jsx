import React from 'react';
import RegisterForm from './RegisterForm';

const RegisterModal = () =>
  (
    <div id="register" className="modal modal-fixed-footer" >
      <div className="modal-content">
        <RegisterForm />
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          className="modal-action modal-close waves-effect waves-green btn-flat"
        >Close
        </a>
      </div>
    </div>
  );

export default RegisterModal;
