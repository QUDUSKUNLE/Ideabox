import React from 'react';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UpdatePasswordForm from '../../src/components/home/UpdatePasswordForm';

Enzyme.configure({ adapter: new Adapter() });

describe('<UpdatePasswordForm/>', () => {
  const handleUpdate = sinon.spy();
  sinon.spy(UpdatePasswordForm.prototype, 'handleChangeEvent');
  sinon.spy(UpdatePasswordForm.prototype, 'componentDidMount');
  const spy = sinon.spy(UpdatePasswordForm.prototype, 'componentWillUnmount');
  const props = {
    newPassword: '',
    confirmPassword: '',
    handleUpdate,
    hash: {
      history: {
        push: jest.fn()
      },
      match: {
        params: {
          hash: '123457jkdsjdsk'
        }
      }
    }
  };
  const wrapper = mount(
    <UpdatePasswordForm {...props} />,
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
              component: '[function UpdatePasswordForm]',
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
    expect(UpdatePasswordForm).toBeDefined();
  });

  it('component should call componentDidMount', () => {
    expect(UpdatePasswordForm.prototype.componentDidMount.calledOnce)
      .toEqual(true);
    UpdatePasswordForm.prototype.componentDidMount.restore();
  });

  it(`component should called handleLogIn method when submit
    button is clicked`, () => {
      const event = {
        preventDefault: jest.fn()
      };
      const spySubmit = jest.spyOn(wrapper.instance(), 'handleUpdate');
      wrapper.instance().handleUpdate(event);
      expect(spySubmit).toHaveBeenCalled();
    });

  it('onChange method should be called while typing in the input field', () => {
    const event = { target: { name: 'name', value: 'value' } };
    wrapper.instance().handleChangeEvent(event);
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
