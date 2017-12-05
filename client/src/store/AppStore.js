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
    this.currentUser = false;

    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.registeredUser = this.handleActions.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  /**
  * @description describes a function that setCurrentUser to true or false
  * @method setCurrentUser
  * @returns { bool} returns currentUser state { true or false }
  */
  setCurrentUser() {
    return this.currentUser;
  }

  /**
  * @description describes a function that returns registerUserPayload
  * @method registerUser
  * @returns { Object } returns registerUser payload
  */
  registeredUser() {
    return this.registerUserPayload;
  }


  /**
   * Receives actions and update the stores accordingly
   * @method handleActions
   * @param {object} action - Action payload
   * @return {*} -
   */
  handleActions(action) {
    switch (action.type) {
      case AppConstants.SIGN_UP:
        this.registerUserPayload = action.response.data;
        this.currentUser = true;
        this.emit(AppConstants.SIGN_UP);
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
