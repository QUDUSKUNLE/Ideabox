import React from 'react';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateIdea from '../../src/components/container/idea/CreateIdea';

Enzyme.configure({ adapter: new Adapter() });

describe('CreateIdea', () => {
  const handleChange = sinon.spy();
  const handleValueChange = sinon.spy();
  sinon.spy(CreateIdea.prototype, 'handleChange');
  sinon.spy(CreateIdea.prototype, 'handleValueChange');
  sinon.spy(CreateIdea.prototype, 'componentDidMount');
  const spy = sinon.spy(CreateIdea.prototype, 'componentWillUnmount');
  const props = {
    category: '',
    title: '',
    access: '',
    ideaLimit: 6,
    reactMdeValue: { text: '', selection: null },
    handleChange,
    handleValueChange,
    history: {
      push: jest.fn()
    }
  };
  const wrapper = mount(
    <CreateIdea {...props} />,
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
              component: '[function CreateIdea]',
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
    expect(CreateIdea).toBeDefined();
  });

  it('component should call componentDidMount', () => {
    expect(CreateIdea.prototype.componentDidMount.calledOnce)
      .toEqual(true);
    CreateIdea.prototype.componentDidMount.restore();
  });

  it(`component should called handleCreateIdea method when submit
    button is clicked`, () => {
      const event = {
        preventDefault: jest.fn()
      };
      const handleCreateIdeaSpy =
        jest.spyOn(wrapper.instance(), 'handleCreateIdea');
      wrapper.instance().handleCreateIdea(event);
      expect(handleCreateIdeaSpy).toHaveBeenCalled();
    });

  it(
    'handleChange method should be called while typing in the input field',
    () => {
      const event = { target: { name: 'name', value: 'value' } };
      wrapper.instance().handleChange(event);
      expect(wrapper.state().name).toEqual('value');
    }
  );

  it(
    'handleValueChange method should be called while typing in the input field',
    () => {
      const event = { reactMdeValue: '' };
      wrapper.instance().handleValueChange(event);
      expect(wrapper.state().name).toEqual('value');
    }
  );

  it(
    'componentWillUnmount component lifecycle to be called when unmounted',
    () => {
      wrapper.instance().componentWillUnmount();
      expect(spy.calledOnce).toBeTruthy();
    }
  );
});
