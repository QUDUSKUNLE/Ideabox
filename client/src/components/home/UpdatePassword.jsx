import React from 'react';


export default () =>
  (
    <div id="update_password" className="modal" >
      <div className="modal-content">
        <div className="container">
          <h5
            className="center-align header"
          >Update Password
          </h5>
          <form
            className="col s12"
          // onSubmit={this.handleRegister}
          >
            <div className="row">
              {/* <div>
                {this.state.show
                  ? customAlert.errorMessage(this.state.signUpError)
                  : (<span />)}
              </div> */}
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  value="newPassword"
                  // onChange={this.onChange}
                  name="newPassword"
                  type="password"
                  id="newPassword"
                  className="validate header"
                  required
                />
                <label
                  htmlFor="newPassword"
                >New password
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  value="confirmPassword"
                  // onChange={this.onChange}
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  className="validate header"
                  required
                />
                <label
                  htmlFor="email"
                >Confirm password
                </label>
              </div>
            </div>
            <div className="row">
              <button
                className="btn waves-effect deep-purple darken-4 col s12"
                type="submit"
              >UPDATE PASSWORD
              </button>
              <br />
              <br />
              <p
                className="center-align header"
              >
                <a
                  className="modal-close"
                  href="#!"
                >CANCEL
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
