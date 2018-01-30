import React from 'react';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserIdeas from '../../src/components/container/UserIdeas';
import mockData from '../../mock/mockData';

Enzyme.configure({ adapter: new Adapter() });

describe('<UserIdeas />', () => {
  const handleDelete = sinon.spy();
  const handleEdit = sinon.spy();
  sinon.spy(UserIdeas.prototype, 'componentWillReceiveProps');
  const props = {
    myIdeas: [],
    handleEdit,
    handleDelete,
    history: {
      push: jest.fn()
    }
  };
  const wrapper = mount(
    <UserIdeas {...props} />,
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
              component: '[function UserIdeas]',
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
    expect(UserIdeas).toBeDefined();
  });

  it(`component should called componentWillReceiveProps method when
   new Props passes to the component`, () => {
      const nextProps = mockData.idea;
      const spycomponentWillReceiveProps =
       jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.instance().componentWillReceiveProps(nextProps);
      expect(spycomponentWillReceiveProps).toHaveBeenCalled();
    });
});
