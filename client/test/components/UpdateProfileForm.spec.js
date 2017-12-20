import React from 'react';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UpdateProfileForm from '../../src/components/home/UpdateProfileForm';

Enzyme.configure({ adapter: new Adapter() });

describe('<UpdateProfileForm />', () => {
  const handleUpdateProfile = sinon.spy();
  sinon.spy(UpdateProfileForm.prototype, 'handleChange');
  sinon.spy(UpdateProfileForm.prototype, 'componentDidMount');
  const spy = sinon.spy(UpdateProfileForm.prototype, 'componentWillUnmount');
  const props = {
    email: '',
    forgotPasswordError: '',
    forgotPasswordSuccess: '',
    show: false,
    success: false,
    userDetails: {},
    handleUpdateProfile
  };
  const wrapper = mount(
    <UpdateProfileForm {...props} />,
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
              component: '[function UpdateProfileForm]',
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
    expect(UpdateProfileForm).toBeDefined();
  });

  it('component should call componentDidMount', () => {
    expect(UpdateProfileForm.prototype.componentDidMount.calledOnce)
      .toEqual(true);
    UpdateProfileForm.prototype.componentDidMount.restore();
  });

  it(`component should called handleUpdateProfile method when submit 
    button is clicked`, () => {
      const event = {
        preventDefault: jest.fn()
      };
      const spySubmit = jest.spyOn(wrapper.instance(), 'handleUpdateProfile');
      wrapper.instance().handleUpdateProfile(event);
      expect(spySubmit).toHaveBeenCalled();
    });

  it('onChange method should be called while typing in the input field', () => {
    const event = { target: { name: 'name', value: 'value' } };
    wrapper.instance().handleChange(event);
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
