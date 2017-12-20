import React from 'react';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RegisterForm from '../../src/components/home/RegisterForm';

Enzyme.configure({ adapter: new Adapter() });

describe('<RegisterForm/>', () => {
  const handleRegister = sinon.spy();
  sinon.spy(RegisterForm.prototype, 'onChange');
  sinon.spy(RegisterForm.prototype, 'componentDidMount');
  const spy = sinon.spy(RegisterForm.prototype, 'componentWillUnmount');
  const props = {
    username: '',
    email: '',
    password: '',
    signUpError: '',
    show: false,
    handleRegister,
    history: {
      push: jest.fn()
    }
  };
  const wrapper = mount(
    <RegisterForm {...props} />,
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
              component: '[function RegisterForm]',
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
    expect(RegisterForm).toBeDefined();
  });

  it('component should call componentDidMount', () => {
    expect(RegisterForm.prototype.componentDidMount.calledOnce)
      .toEqual(true);
    RegisterForm.prototype.componentDidMount.restore();
  });

  it(`component should called handleRegister method when submit
    button is clicked`, () => {
      const event = {
        preventDefault: jest.fn()
      };
      const spySubmit = jest.spyOn(wrapper.instance(), 'handleRegister');
      wrapper.instance().handleRegister(event);
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
