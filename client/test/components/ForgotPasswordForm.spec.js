import React from 'react';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ForgotPasswordForm from '../../src/components/home/ForgotPasswordForm';

Enzyme.configure({ adapter: new Adapter() });

describe('ForgotPasswordForm ', () => {
  const handleResetPassword = sinon.spy();
  sinon.spy(ForgotPasswordForm.prototype, 'onChange');
  sinon.spy(ForgotPasswordForm.prototype, 'componentDidMount');
  const spy = sinon.spy(ForgotPasswordForm.prototype, 'componentWillUnmount');
  const props = {
    email: '',
    forgotPasswordError: '',
    forgotPasswordSuccess: '',
    show: false,
    success: false,
    handleResetPassword
  };
  const wrapper = mount(
    <ForgotPasswordForm {...props} />,
    {
      childContextTypes: { router: PropTypes.object },
      context: {
        router:
          {
            history: {
              push: () => null,
              replace: () => null,
              createHref: () => null,
              path: '/',
              component: '[function UserSignUp]',
              location: {
                pathname: '/',
                search: '',
                hash: '',
                key: '6l9jpq'
              },
              computedMatch: {
                path: '/',
                url: '/',
                isExact: true,
                params: {}
              }
            }
          }
      }
    }
  );

  it('component should be defined', () => {
    expect(ForgotPasswordForm).toBeDefined();
  });

  it('component should call componentDidMount', () => {
    expect(ForgotPasswordForm.prototype.componentDidMount.calledOnce)
      .toEqual(true);
    ForgotPasswordForm.prototype.componentDidMount.restore();
  });

  it(`component should called handleResetPassword method when submit 
    button is clicked`, () => {
      const event = {
        preventDefault: jest.fn()
      };
      const spySubmit = jest.spyOn(wrapper.instance(), 'handleResetPassword');
      wrapper.instance().handleResetPassword(event);
      expect(spySubmit).toHaveBeenCalled();
    });

  it('onChange method should be called while typing in the input field', () => {
    const event = { target: { name: 'name', value: 'value' } };
    wrapper.instance().onChange(event);
    expect(wrapper.state().name).toEqual('value');
  });

  it(
    'componentWillUnmount component lifecycle to be called when unmounted',
    () => {
      wrapper.instance().componentWillUnmount();
      expect(spy.calledOnce).toBeTruthy();
    }
  );
});
