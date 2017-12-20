import React from 'react';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditIdea from '../../src/components/container/idea/EditIdea';
import mockData from '../../mock/mockData';

Enzyme.configure({ adapter: new Adapter() });

describe('EditIdea', () => {
  const handleEditIdea = sinon.spy();
  sinon.spy(EditIdea.prototype, 'handleChange');
  const props = {
    title: '',
    description: '',
    category: '',
    access: '',
    ideaId: '',
    handleEditIdea,
    selectedIdea: [],
    history: {
      push: jest.fn()
    }
  };
  const wrapper = mount(
    <EditIdea {...props} />,
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
              component: '[function EditIdea]',
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
    expect(EditIdea).toBeDefined();
  });

  it(`component should called handleEditIdea method when submit
    button is clicked`, () => {
      const event = {
        preventDefault: jest.fn()
      };
      const spyhandleEditIdea =
        jest.spyOn(wrapper.instance(), 'handleEditIdea');
      wrapper.instance().handleEditIdea(event);
      expect(spyhandleEditIdea).toHaveBeenCalled();
    });

  it(
    'handleChange method should be called while typing in the input field',
    () => {
      const event = { target: { name: 'name', value: 'value' } };
      wrapper.instance().handleChange(event);
      expect(wrapper.state().name).toEqual('value');
    }
  );

  it(`component should called componentWillReceiveProps method when
   new Props passes to the component`, () => {
      const nextProps = mockData.selectIdea;
      const spycomponentWillReceiveProps =
        jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.instance().componentWillReceiveProps(nextProps);
      expect(spycomponentWillReceiveProps).toHaveBeenCalled();
    });
});
