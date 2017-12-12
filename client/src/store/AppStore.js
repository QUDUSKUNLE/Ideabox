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
    this.deletePayload = {};
    this.myIdeaPayload = {};
    this.publicIdeaPayload = {};
    this.registerUserPayload = {};
    this.resetPasswordPayload = {};
    this.searchIdeaPayload = {};
    this.updatePayload = {};

    this.categoryIdea = this.categoryIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
    this.handleActions = this.handleActions.bind(this);
    this.myIdea = this.myIdea.bind(this);
    this.publicIdea = this.publicIdea.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.searchIdea = this.searchIdea.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.updateIdea = this.updateIdea.bind(this);
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
  * @description describes a function that returns deletePayload
  * @method createIdea
  * @return {Object} returns deleted Idea payload
  */
  deleteIdea() {
    return this.deletePayload;
  }

  /**
  * @description describes a function that returns a user ideas
  * @method myIdea
  * @return {Object} returns myIdea payload
  */
  myIdea() {
    return this.myIdeaPayload;
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
  * @description describes a function that handles search for Ideas
  * @method setCurrentUser
  * @returns {object} returns search Ideas payload
  */
  searchIdea() {
    return this.searchIdeaPayload;
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
  * @description describes a function that update idea
  * @method setCurrentUser
  * @returns {object} returns updated idea payLoad
  */
  updateIdea() {
    return this.updatePayload;
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

      case AppConstants.MY_IDEAS:
        this.myIdeaPayload = action.response.data;
        this.emit(AppConstants.MY_IDEAS);
        break;

      case AppConstants.DELETE_IDEA:
        this.deletePayload = action.response.data;
        this.emit(AppConstants.DELETE_IDEA);
        break;

      case AppConstants.UPDATE_IDEA:
        this.updatePayload = action.response.data;
        this.emit(AppConstants.UPDATE_IDEA);
        break;

      case AppConstants.SEARCH_IDEA:
        this.searchIdeaPayload = action.response.data;
        this.emit(AppConstants.SEARCH_IDEA);
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
