import React from 'react';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import { mount } from 'enzyme';
import ForgotPasswordForm from '../../src/components/home/ForgotPasswordForm';


describe('<ForgotPasswordForm/>', () => {
  const signUpAction = sinon.spy();
  sinon.spy(ForgotPasswordForm.prototype, 'onChange');
  sinon.spy(ForgotPasswordForm.prototype, 'componentDidMount');
  const spy = sinon.spy(ForgotPasswordForm.prototype, 'componentWillUnmount');
  const props = {
    email: '',
    forgotPasswordError: '',
    forgotPasswordSuccess: '',
    show: false,
    success: false,
    signUpAction
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

  // it('component should have signup form', () => {
  //   expect(wrapper.find('form').length).toEqual(1);
  //   expect(wrapper.find('[type="text"]').at(0).length).toEqual(1);
  //   expect(wrapper.find('[type="email"]').at(0).length).toEqual(1);
  //   expect(wrapper.find('[type="password"]').at(0).length).toEqual(1);
  //   expect(wrapper.find('[type="submit"]').at(0).length).toEqual(1);
  // });

  it('component should call componentDidMount', () => {
    expect(ForgotPasswordForm.prototype.componentDidMount.calledOnce)
      .toEqual(true);
    ForgotPasswordForm.prototype.componentDidMount.restore();
  });

  // it(
  //   'component should called onSubmit method when submit button is clicked',
  //   () => {
  //     wrapper.find('form').simulate('submit');
  //     expect(ForgotPasswordForm.prototype.onSubmit.calledOnce).toEqual(true);
  //   }
  // );

  // it('onChange method should be called while typing in the input field', () => {
  //   const event = { target: { name: 'name', value: 'value' } };
  //   wrapper.instance().onChange(event);
  //   expect(wrapper.state().name).toEqual('value');
  // });

  // it(
  //   'componentWillUnmount component lifecycle to be called when unmounted',
  //   () => {
  //     wrapper.instance().componentWillUnmount();
  //     expect(spy.calledOnce).toBeTruthy();
  //   }
  // );
});
