import axios from 'axios';
import sinon from 'sinon';
import AppConstants from '../../src/contants/AppConstants';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import AppActions from '../../src/actions/AppActions';
import mockData from '../../mock/mockData';
import mockResponse from '../../mock/mockResponse';

// Actions test
describe('', () => {
  // Test for sign up action
  describe('Sign up function', () => {
    let mockAxios;
    let dispatchSpy;

    beforeEach(() => {
      mockAxios = sinon.stub(axios, 'post').callsFake(() =>
        Promise.resolve(mockResponse.signUp));
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    });

    afterEach(() => {
      axios.post.restore();
      AppDispatcher.dispatch.restore();
    });

    it('should dispatch SIGN_UP action on successful sign up', () => {
      AppActions.signUpUser(mockData.signUpUser).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe(AppConstants.SIGN_UP);
      });
    });
  });

  // Test for log in action
  describe('Log in function', () => {
    let mockAxios;
    let dispatchSpy;

    beforeEach(() => {
      mockAxios = sinon.stub(axios, 'post').callsFake(() =>
        Promise.resolve(mockResponse.logIn));
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    });

    afterEach(() => {
      axios.post.restore();
      AppDispatcher.dispatch.restore();
    });

    it('should dispatch LOG_IN action on successful log in', () => {
      AppActions.logInUser(mockData.logInUser).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe(AppConstants.LOG_IN);
      });
    });
  });

  // Test for reset password action
  describe('Reset password function', () => {
    let mockAxios;
    let dispatchSpy;

    beforeEach(() => {
      mockAxios = sinon.stub(axios, 'post').callsFake(() =>
        Promise.resolve(mockResponse.resetPassword));
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    });

    afterEach(() => {
      axios.post.restore();
      AppDispatcher.dispatch.restore();
    });

    it(
      'should dispatch RESET_PASSWORD action on successful reset password',
      () => {
        AppActions.resetPassword(mockData.resetPassword).then(() => {
          expect(mockAxios.calledOnce).toBe(true);
          expect(dispatchSpy.calledOnce).toEqual(true);
          expect(dispatchSpy.getCall(0).args[0].type)
            .toBe(AppConstants.RESET_PASSWORD);
        });
      }
    );
  });

  // Test for create Idea action
  describe('Create idea function', () => {
    let mockAxios;
    let dispatchSpy;

    beforeEach(() => {
      mockAxios = sinon.stub(axios, 'post').callsFake(() =>
        Promise.resolve(mockResponse.createIdea));
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    });

    afterEach(() => {
      axios.post.restore();
      AppDispatcher.dispatch.restore();
    });

    it(
      'should dispatch CREATE_IDEA action when new idea is created',
      () => {
        AppActions.createIdea(mockData.createIdea).then(() => {
          expect(mockAxios.calledOnce).toBe(true);
          expect(dispatchSpy.calledOnce).toEqual(true);
          expect(dispatchSpy.getCall(0).args[0].type)
            .toBe(AppConstants.CREATE_IDEA);
        });
      }
    );
  });

  // Test for fetch public ideas action
  describe('Fetch public ideas function', () => {
    let mockAxios;
    let dispatchSpy;

    beforeEach(() => {
      mockAxios = sinon.stub(axios, 'get').callsFake(() =>
        Promise.resolve(mockResponse.fetchPublicIdea));
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    });

    afterEach(() => {
      axios.get.restore();
      AppDispatcher.dispatch.restore();
    });

    it(
      'should dispatch PUBLIC_IDEAS action when getting all public ideas',
      () => {
        AppActions.getPublicIdeas(20, 0).then(() => {
          expect(mockAxios.calledOnce).toBe(true);
          expect(dispatchSpy.calledOnce).toEqual(true);
          expect(dispatchSpy.getCall(0).args[0].type)
            .toBe(AppConstants.PUBLIC_IDEAS);
        });
      }
    );
  });

  // Test for fetch idea by category action
  describe('Fetch idea by category function', () => {
    let mockAxios;
    let dispatchSpy;

    beforeEach(() => {
      mockAxios = sinon.stub(axios, 'get').callsFake(() =>
        Promise.resolve(mockResponse.fetchIdeaByCategory));
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    });

    afterEach(() => {
      axios.get.restore();
      AppDispatcher.dispatch.restore();
    });

    it(
      'should dispatch CATEGORY action when idea is fetched by category',
      () => {
        AppActions.fetchByCategory('TECHNOLOGY', 20, 0).then(() => {
          expect(mockAxios.calledOnce).toBe(true);
          expect(dispatchSpy.calledOnce).toEqual(true);
          expect(dispatchSpy.getCall(0).args[0].type)
            .toBe(AppConstants.CATEGORY);
        });
      }
    );
  });

  // Test for my Idea action
  describe('My Idea function', () => {
    let mockAxios;
    let dispatchSpy;

    beforeEach(() => {
      mockAxios = sinon.stub(axios, 'get').callsFake(() =>
        Promise.resolve(mockResponse.myIdeas));
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    });

    afterEach(() => {
      axios.get.restore();
      AppDispatcher.dispatch.restore();
    });

    it(
      'should dispatch MY_IDEAS action when all user ideas is fetched',
      () => {
        AppActions.myIdeas(20, 0).then(() => {
          expect(mockAxios.calledOnce).toBe(true);
          expect(dispatchSpy.calledOnce).toEqual(true);
          expect(dispatchSpy.getCall(0).args[0].type)
            .toBe(AppConstants.MY_IDEAS);
        });
      }
    );
  });

  // Test for delete idea action
  describe('Delete Idea function', () => {
    let mockAxios;
    let dispatchSpy;

    beforeEach(() => {
      mockAxios = sinon.stub(axios, 'delete').callsFake(() =>
        Promise.resolve(mockResponse.deleteIdea));
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    });

    afterEach(() => {
      axios.delete.restore();
      AppDispatcher.dispatch.restore();
    });

    it(
      'should dispatch DELETE_IDEA action when an idea is delete successfully',
      () => {
        AppActions.deleteIdea(mockData.ideaId).then(() => {
          expect(mockAxios.calledOnce).toBe(true);
          expect(dispatchSpy.calledOnce).toEqual(true);
          expect(dispatchSpy.getCall(0).args[0].type)
            .toBe(AppConstants.DELETE_IDEA);
        });
      }
    );
  });

  // Test for update idea action
  describe('Update Idea function', () => {
    let mockAxios;
    let dispatchSpy;

    beforeEach(() => {
      mockAxios = sinon.stub(axios, 'put').callsFake(() =>
        Promise.resolve(mockResponse.updateIdea));
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    });

    afterEach(() => {
      axios.put.restore();
      AppDispatcher.dispatch.restore();
    });

    it(
      'should dispatch UPDATE_IDEA action when an idea is updated successfully',
      () => {
        AppActions.updateIdea(mockData.ideaDetails).then(() => {
          expect(mockAxios.calledOnce).toBe(true);
          expect(dispatchSpy.calledOnce).toEqual(true);
          expect(dispatchSpy.getCall(0).args[0].type)
            .toBe(AppConstants.UPDATE_IDEA);
        });
      }
    );
  });

  // Test for search ideas action
  describe('Search Idea', () => {
    let mockAxios;
    let dispatchSpy;

    beforeEach(() => {
      mockAxios = sinon.stub(axios, 'get').callsFake(() =>
        Promise.resolve(mockResponse.searchIdea));
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    });

    afterEach(() => {
      axios.get.restore();
      AppDispatcher.dispatch.restore();
    });

    it(
      'should dispatch SEARCH_IDEA action when ideas are searched for',
      () => {
        AppActions.searchIdea(mockData.ideaId).then(() => {
          expect(mockAxios.calledOnce).toBe(true);
          expect(dispatchSpy.calledOnce).toEqual(true);
          expect(dispatchSpy.getCall(0).args[0].type)
            .toBe(AppConstants.SEARCH_IDEA);
        });
      }
    );
  });

  // Test for update profile action
  describe('Update profile function', () => {
    let mockAxios;
    let dispatchSpy;

    beforeEach(() => {
      mockAxios = sinon.stub(axios, 'put').callsFake(() =>
        Promise.resolve(mockResponse.updateProfile));
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    });

    afterEach(() => {
      axios.put.restore();
      AppDispatcher.dispatch.restore();
    });

    it(`should dispatch UPDATE_PROFILE action when user
        profile is updated successfully`, () => {
        AppActions.updateProfile(mockData.ideaId).then(() => {
          expect(mockAxios.calledOnce).toBe(true);
          expect(dispatchSpy.calledOnce).toEqual(true);
          expect(dispatchSpy.getCall(0).args[0].type)
            .toBe(AppConstants.UPDATE_PROFILE);
        });
      });
  });

  // Test for fetch an idea action
  describe('Fetch an Idea function', () => {
    let mockAxios;
    let dispatchSpy;

    beforeEach(() => {
      mockAxios = sinon.stub(axios, 'get').callsFake(() =>
        Promise.resolve(mockResponse.fetchIdea));
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    });

    afterEach(() => {
      axios.get.restore();
      AppDispatcher.dispatch.restore();
    });

    it(`should dispatch FETCH_IDEA action when an idea 
      is fetched successfully`, () => {
        AppActions.fetchIdea(mockData.ideaId).then(() => {
          expect(mockAxios.calledOnce).toBe(true);
          expect(dispatchSpy.calledOnce).toEqual(true);
          expect(dispatchSpy.getCall(0).args[0].type)
            .toBe(AppConstants.FETCH_IDEA);
        });
      });
  });

  // Test for create comment action
  describe('Send comment function', () => {
    let mockAxios;
    let dispatchSpy;

    beforeEach(() => {
      mockAxios = sinon.stub(axios, 'post').callsFake(() =>
        Promise.resolve(mockResponse.createComment));
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    });

    afterEach(() => {
      axios.post.restore();
      AppDispatcher.dispatch.restore();
    });

    it(`should dispatch CREATE_COMMENT action when a 
      comment is created on an idea`, () => {
        AppActions.sendComment(mockData.ideaId).then(() => {
          expect(mockAxios.calledOnce).toBe(true);
          expect(dispatchSpy.calledOnce).toEqual(true);
          expect(dispatchSpy.getCall(0).args[0].type)
            .toBe(AppConstants.CREATE_COMMENT);
        });
      });
  });

  // Test for fetch comment action
  describe('Fetch comment function', () => {
    let mockAxios;
    let dispatchSpy;

    beforeEach(() => {
      mockAxios = sinon.stub(axios, 'get').callsFake(() =>
        Promise.resolve(mockResponse.fetchComment));
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    });

    afterEach(() => {
      axios.get.restore();
      AppDispatcher.dispatch.restore();
    });

    it(`should dispatch FETCH_COMMENT action when all comment attached 
      to an idea is successfully fetched`, () => {
        AppActions.fetchComment(mockData.ideaId).then(() => {
          expect(mockAxios.calledOnce).toBe(true);
          expect(dispatchSpy.calledOnce).toEqual(true);
          expect(dispatchSpy.getCall(0).args[0].type)
            .toBe(AppConstants.FETCH_COMMENT);
        });
      });
  });

  // Test for update password action
  describe('Update password function', () => {
    let mockAxios;
    let dispatchSpy;

    beforeEach(() => {
      mockAxios = sinon.stub(axios, 'put').callsFake(() =>
        Promise.resolve(mockResponse.updatePassword));
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    });

    afterEach(() => {
      axios.put.restore();
      AppDispatcher.dispatch.restore();
    });

    it(`should dispatch UPDATE_PASSWORD action when user successfully 
      updated his/her password`, () => {
        AppActions.updatePassword(mockData.ideaId).then(() => {
          expect(mockAxios.calledOnce).toBe(true);
          expect(dispatchSpy.calledOnce).toEqual(true);
          expect(dispatchSpy.getCall(0).args[0].type)
            .toBe(AppConstants.UPDATE_PASSWORD);
        });
      });
  });
});
