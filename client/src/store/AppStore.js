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
    this.createCommentPayload = {};
    this.deletePayload = {};
    this.fetchIdeaPayload = {};
    this.fetchCommentPayload = {};
    this.myIdeaPayload = {};
    this.publicIdeaPayload = {};
    this.registerUserPayload = {};
    this.resetPasswordPayload = {};
    this.searchIdeaPayload = {};
    this.updatePayload = {};
    this.updateProfilePayload = {};
    this.updatePasswordPayload = {};

    this.categoryIdea = this.categoryIdea.bind(this);
    this.createComment = this.createComment.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
    this.fetchIdea = this.fetchIdea.bind(this);
    this.fetchComment = this.fetchComment.bind(this);
    this.handleActions = this.handleActions.bind(this);
    this.myIdea = this.myIdea.bind(this);
    this.publicIdea = this.publicIdea.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.searchIdea = this.searchIdea.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.updateIdea = this.updateIdea.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  /**
  * @description describes a function that returns categoryIdeaPayload
  * @method categoryIdea
  * @return {Object} returns category payload
  */
  categoryIdea() {
    return this.categoryIdeaPayload;
  }

  /**
  * @description describes a function that returns createCommentPayload
  * @method createComment
  * @return {Object} returns createIdea payload
  */
  createComment() {
    return this.createCommentPayload;
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
  * @method deleteIdea
  * @return {Object} returns deleted Idea payload
  */
  deleteIdea() {
    return this.deletePayload;
  }

  /**
  * @description describes a function that returns fetchIdeaPayload
  * @method fetchIdea
  * @return {Object} returns fetchIdea payload
  */
  fetchIdea() {
    return this.fetchIdeaPayload;
  }

  /**
  * @description describes a function that returns fetchCommentPayload
  * @method fetchComment
  * @return {Object} returns fetchComment payload
  */
  fetchComment() {
    return this.fetchCommentPayload;
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
  * @description describes a function that returns publicIdeaPayload
  * @method publicIdea
  * @return {Object} returns publicIdeaPayload payload
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
  * @method updateIdea
  * @returns {object} returns updated idea payLoad
  */
  updateIdea() {
    return this.updatePayload;
  }

  /**
  * @description describes a function that update user Profile
  * @method updateProfile
  * @returns {object} returns user updated profile payLoad
  */
  updateProfile() {
    return this.updateProfilePayload;
  }

  /**
  * @description describes a function that update user`s password
  * @method updatePassword
  * @returns {object} returns user updated password payLoad
  */
  updatePassword() {
    return this.updatePasswordPayload;
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

      case AppConstants.UPDATE_PROFILE:
        this.updateProfilePayload = action.response.data;
        this.emit(AppConstants.UPDATE_PROFILE);
        break;

      case AppConstants.FETCH_IDEA:
        this.fetchIdeaPayload = action.response.data;
        this.emit(AppConstants.FETCH_IDEA);
        break;

      case AppConstants.CREATE_COMMENT:
        this.createCommentPayload = action.response.data;
        this.emit(AppConstants.CREATE_COMMENT);
        break;

      case AppConstants.FETCH_COMMENT:
        this.fetchCommentPayload = action.response.data;
        this.emit(AppConstants.FETCH_COMMENT);
        break;

      case AppConstants.UPDATE_PASSWORD:
        this.updatePasswordPayload = action.response.data;
        this.emit(AppConstants.UPDATE_PASSWORD);
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
