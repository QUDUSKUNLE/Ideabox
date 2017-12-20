import AppConstants from '../../src/contants/AppConstants';
import AppStore from '../../src/store/AppStore';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import mockResponse from '../../mock/mockResponse';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/store/AppStore');

// Test for AppStore
describe('AppStore', () => {
  // Test for registerUser method
  describe('registerUser method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockResponse.signUpResponse;
    });

    afterEach(() => {
      AppStore.handleActions({
        type: AppConstants.SIGN_UP, response: { data: {} }
      });
    });

    it(`should return response when action SIGN_UP action is dispatched
     to the store`, () => {
        AppDispatcherMock({ type: AppConstants.SIGN_UP, response });
        expect(AppStore.registerUser()).toEqual(response.data);
        expect(AppStore.setCurrentUser()).toBeTruthy();
      });
    it('should return an empty object on first call', () => {
      expect(AppStore.registerUser()).toEqual({});
    });
  });

  // Test for logIn method
  describe('logIn method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockResponse.logInResponse;
    });

    afterEach(() => {
      AppStore.handleActions({
        type: AppConstants.LOG_IN, response: { data: {} }
      });
    });

    it(`should return response when action LOG_IN action is dispatched
     to the store`, () => {
        AppDispatcherMock({ type: AppConstants.LOG_IN, response });
        expect(AppStore.registerUser()).toEqual(response.data);
        expect(AppStore.setCurrentUser()).toBeTruthy();
      });
    it('should return an empty object on first call', () => {
      expect(AppStore.registerUser()).toEqual({});
    });
  });

  // Test for reset password method
  describe('reset password method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockResponse.resetPasswordResponse;
    });

    afterEach(() => {
      AppStore.handleActions({
        type: AppConstants.RESET_PASSWORD, response: { data: {} }
      });
    });

    it(`should return response when action RESET_PASSWORD action is dispatched
     to the store`, () => {
        AppDispatcherMock({ type: AppConstants.RESET_PASSWORD, response });
        expect(AppStore.resetPassword()).toEqual(response.data);
      });
    it('should return an empty object on first call', () => {
      expect(AppStore.resetPassword()).toEqual({});
    });
  });

  // Test for create idea method
  describe('create idea method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockResponse.createIdeaResponse;
    });

    afterEach(() => {
      AppStore.handleActions({
        type: AppConstants.CREATE_IDEA, response: { data: {} }
      });
    });

    it(`should return response when action CREATE_IDEA action is dispatched
     to the store`, () => {
        AppDispatcherMock({ type: AppConstants.CREATE_IDEA, response });
        expect(AppStore.createIdea()).toEqual(response.data);
      });
    it('should return an empty object on first call', () => {
      expect(AppStore.createIdea()).toEqual({});
    });
  });

  // Test for fetch public idea method
  describe('fetch public idea method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockResponse.publicIdeasResponse;
    });

    afterEach(() => {
      AppStore.handleActions({
        type: AppConstants.PUBLIC_IDEAS, response: { data: {} }
      });
    });

    it(`should return response when action PUBLIC_IDEAS action is dispatched
     to the store`, () => {
        AppDispatcherMock({ type: AppConstants.PUBLIC_IDEAS, response });
        expect(AppStore.publicIdea()).toEqual(response.data);
      });
    it('should return an empty object on first call', () => {
      expect(AppStore.publicIdea()).toEqual({});
    });
  });

  // Test for fetch idea by category method
  describe('Idea category method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockResponse.categoryIdeasResponse;
    });

    afterEach(() => {
      AppStore.handleActions({
        type: AppConstants.CATEGORY, response: { data: {} }
      });
    });

    it(`should return response when action CATEGORY action is dispatched
     to the store`, () => {
        AppDispatcherMock({ type: AppConstants.CATEGORY, response });
        expect(AppStore.categoryIdea()).toEqual(response.data);
      });
    it('should return an empty object on first call', () => {
      expect(AppStore.categoryIdea()).toEqual({});
    });
  });

  // Test for myIdeas method
  describe('myIdeas method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockResponse.myIdeasResponse;
    });

    afterEach(() => {
      AppStore.handleActions({
        type: AppConstants.MY_IDEAS, response: { data: {} }
      });
    });

    it(`should return response when action MY_IDEAS action is dispatched
     to the store`, () => {
        AppDispatcherMock({ type: AppConstants.MY_IDEAS, response });
        expect(AppStore.myIdea()).toEqual(response.data);
      });
    it('should return an empty object on first call', () => {
      expect(AppStore.myIdea()).toEqual({});
    });
  });

  // Test for delete idea method
  describe('Delete idea method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockResponse.deleteIdeaResponse;
    });

    afterEach(() => {
      AppStore.handleActions({
        type: AppConstants.DELETE_IDEA, response: { data: {} }
      });
    });

    it(`should return response when action DELETE_IDEA action is dispatched
     to the store`, () => {
        AppDispatcherMock({ type: AppConstants.DELETE_IDEA, response });
        expect(AppStore.deleteIdea()).toEqual(response.data);
      });
    it('should return an empty object on first call', () => {
      expect(AppStore.deleteIdea()).toEqual({});
    });
  });

  // Test for update idea method
  describe('update Idea method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockResponse.updateIdeaResponse;
    });

    afterEach(() => {
      AppStore.handleActions({
        type: AppConstants.UPDATE_IDEA, response: { data: {} }
      });
    });

    it(`should return response when action UPDATE_IDEA action is dispatched
     to the store`, () => {
        AppDispatcherMock({ type: AppConstants.UPDATE_IDEA, response });
        expect(AppStore.updateIdea()).toEqual(response.data);
      });
    it('should return an empty object on first call', () => {
      expect(AppStore.updateIdea()).toEqual({});
    });
  });

  // Test for search for idea method
  describe('search Idea method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockResponse.searchIdeaResponse;
    });

    afterEach(() => {
      AppStore.handleActions({
        type: AppConstants.SEARCH_IDEA, response: { data: {} }
      });
    });

    it(`should return response when action SEARCH_IDEA action is dispatched
     to the store`, () => {
        AppDispatcherMock({ type: AppConstants.SEARCH_IDEA, response });
        expect(AppStore.searchIdea()).toEqual(response.data);
      });
    it('should return an empty object on first call', () => {
      expect(AppStore.searchIdea()).toEqual({});
    });
  });

  // Test for update profile method
  describe('update profile method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockResponse.updateProfileResponse;
    });

    afterEach(() => {
      AppStore.handleActions({
        type: AppConstants.UPDATE_PROFILE, response: { data: {} }
      });
    });

    it(`should return response when action UPDATE_PROFILE action is dispatched
     to the store`, () => {
        AppDispatcherMock({ type: AppConstants.UPDATE_PROFILE, response });
        expect(AppStore.updateProfile()).toEqual(response.data);
      });
    it('should return an empty object on first call', () => {
      expect(AppStore.updateProfile()).toEqual({});
    });
  });

  // Test for fetch idea by idea method
  describe('fetch Idea method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockResponse.fetchIdeaResponse;
    });

    afterEach(() => {
      AppStore.handleActions({
        type: AppConstants.FETCH_IDEA, response: { data: {} }
      });
    });

    it(`should return response when action FETCH_IDEA action is dispatched
     to the store`, () => {
        AppDispatcherMock({ type: AppConstants.FETCH_IDEA, response });
        expect(AppStore.fetchIdea()).toEqual(response.data);
      });
    it('should return an empty object on first call', () => {
      expect(AppStore.fetchIdea()).toEqual({});
    });
  });

  // Test for create comment method
  describe('create comment method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockResponse.createCommentResponse;
    });

    afterEach(() => {
      AppStore.handleActions({
        type: AppConstants.CREATE_COMMENT, response: { data: {} }
      });
    });

    it(`should return response when action CREATE_COMMENT action is dispatched
     to the store`, () => {
        AppDispatcherMock({ type: AppConstants.CREATE_COMMENT, response });
        expect(AppStore.createComment()).toEqual(response.data);
      });
    it('should return an empty object on first call', () => {
      expect(AppStore.createComment()).toEqual({});
    });
  });

  // Test for fetch comment method
  describe('fetch comment method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockResponse.fetchCommentResponse;
    });

    afterEach(() => {
      AppStore.handleActions({
        type: AppConstants.FETCH_COMMENT, response: { data: {} }
      });
    });

    it(`should return response when action FETCH_COMMENT action is dispatched
     to the store`, () => {
        AppDispatcherMock({ type: AppConstants.FETCH_COMMENT, response });
        expect(AppStore.fetchComment()).toEqual(response.data);
      });
    it('should return an empty object on first call', () => {
      expect(AppStore.fetchComment()).toEqual({});
    });
  });

  // Test for update password method
  describe('update password method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockResponse.updatePasswordResponse;
    });

    afterEach(() => {
      AppStore.handleActions({
        type: AppConstants.UPDATE_PASSWORD, response: { data: {} }
      });
    });

    it(`should return response when action UPDATE_PASSWORD action is dispatched
     to the store`, () => {
        AppDispatcherMock({ type: AppConstants.UPDATE_PASSWORD, response });
        expect(AppStore.updatePassword()).toEqual(response.data);
      });
    it('should return an empty object on first call', () => {
      expect(AppStore.updatePassword()).toEqual({});
    });
  });
});
