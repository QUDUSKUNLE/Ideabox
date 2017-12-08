import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../contants/AppConstants';

/**
 * AppStore, it hold application data and listen to Actions
 * @class AppStore
 */
class AppStore extends EventEmitter {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.registerUserPayload = {};
    this.resetPasswordPayload = {};
    this.currentUser = false;

    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.registeredUser = this.registeredUser.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  /**
  * @description describes a function that setCurrentUser to true or false
  * @method setCurrentUser
  * @returns {bool} returns currentUser state { true or false }
  */
  setCurrentUser() {
    return this.currentUser;
  }

  /**
  * @description describes a function that returns registerUserPayload
  * @method registerUser
  * @return {Object} returns registerUser payload
  */
  registeredUser() {
    return this.registerUserPayload;
  }

  /**
  * @description describes a function that returns resetPasswordPayload
  * @method resetPassword
  * @return {Object} returns resetPassword payload
  */
  resetPassword() {
    return this.resetPasswordPayload;
  }


  /**
   * Receives actions and update the stores accordingly
   * @method handleActions
   * @param {object} action - Action payload
   * @return {void}
   */
  handleActions(action) {
    switch (action.type) {
      case AppConstants.SIGN_UP:
        this.registerUserPayload = action.response.data;
        this.currentUser = true;
        this.emit(AppConstants.SIGN_UP);
        break;
      case AppConstants.LOG_IN:
        this.registerUserPayload = action.response.data;
        this.currentUser = true;
        this.emit(AppConstants.LOG_IN);
        break;
      case AppConstants.RESET_PASSWORD:
        this.resetPasswordPayload = action.response.data;
        this.emit(AppConstants.RESET_PASSWORD);
        break;

      default:
    }
  }
}

// Initiate an instance of AppStore
const appStore = new AppStore();

// Register a dispatcher and bind it to handleActions method
AppDispatcher.register(appStore.handleActions.bind(appStore));

// export an instance of AppStore
export default appStore;
