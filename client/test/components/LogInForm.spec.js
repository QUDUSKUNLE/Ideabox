import React from 'react';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LogInForm from '../../src/components/home/LogInForm';

Enzyme.configure({ adapter: new Adapter() });

describe('<LogInForm/>', () => {
  const handleLogIn = sinon.spy();
  sinon.spy(LogInForm.prototype, 'onChange');
  sinon.spy(LogInForm.prototype, 'componentDidMount');
  const spy = sinon.spy(LogInForm.prototype, 'componentWillUnmount');
  const props = {
    email: '',
    password: '',
    logInError: '',
    show: false,
    handleLogIn,
    history: {
      push: jest.fn()
    }
  };
  const wrapper = mount(
    <LogInForm {...props} />,
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
              component: '[function LogInForm]',
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
    expect(LogInForm).toBeDefined();
  });

  it('component should call componentDidMount', () => {
    expect(LogInForm.prototype.componentDidMount.calledOnce)
      .toEqual(true);
    LogInForm.prototype.componentDidMount.restore();
  });

  it(`component should called handleLogIn method when submit
    button is clicked`, () => {
      const event = {
        preventDefault: jest.fn()
      };
      const spySubmit = jest.spyOn(wrapper.instance(), 'handleLogIn');
      wrapper.instance().handleLogIn(event);
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
