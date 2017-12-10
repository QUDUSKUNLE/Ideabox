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
    this.categoryIdeaPayload = {};
    this.currentUser = false;
    this.createIdeaPayload = {};
    this.publicIdeaPayload = {};
    this.registerUserPayload = {};
    this.resetPasswordPayload = {};

    this.categoryIdea = this.categoryIdea.bind(this);
    this.handleActions = this.handleActions.bind(this);
    this.publicIdea = this.publicIdea.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
  }

  /**
  * @description describes a function that returns categoryIdeaPayload
  * @method category
  * @return {Object} returns category payload
  */
  categoryIdea() {
    return this.categoryIdeaPayload;
  }
  /**
  * @description describes a function that returns createIdeaPayload
  * @method createIdea
  * @return {Object} returns createIdea payload
  */
  createIdea() {
    return this.createIdeaPayload;
  }

  /**
  * @description describes a function that returns registerUserPayload
  * @method registerUser
  * @return {Object} returns registerUser payload
  */
  publicIdea() {
    return this.publicIdeaPayload;
  }
  /**
  * @description describes a function that returns registerUserPayload
  * @method registerUser
  * @return {Object} returns registerUser payload
  */
  registerUser() {
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
  * @description describes a function that setCurrentUser to true or false
  * @method setCurrentUser
  * @returns {bool} returns currentUser state { true or false }
  */
  setCurrentUser() {
    return this.currentUser;
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

      case AppConstants.CREATE_IDEA:
        this.createIdeaPayload = action.response.data;
        this.emit(AppConstants.CREATE_IDEA);
        break;

      case AppConstants.PUBLIC_IDEAS:
        this.publicIdeaPayload = action.response.data;
        this.emit(AppConstants.PUBLIC_IDEAS);
        break;

      case AppConstants.CATEGORY:
        this.categoryIdeaPayload = action.response.data;
        this.emit(AppConstants.CATEGORY);
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
