import React from 'react';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Idea from '../../src/components/container/idea/Idea';
import mockData from '../../mock/mockData';

Enzyme.configure({ adapter: new Adapter() });

describe('<Idea />', () => {
  sinon.spy(Idea.prototype, 'componentWillReceiveProps');
  const props = {
    publicIdea: [],
    history: {
      push: jest.fn()
    }
  };
  const wrapper = mount(
    <Idea {...props} />,
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
              component: '[function Idea]',
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
    expect(Idea).toBeDefined();
  });

  it(`component should called componentWillReceiveProps method when
   new Props passes to the component`, () => {
      const nextProps = mockData.mockPublic;
      const spycomponentWillReceiveProps =
        jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.instance().componentWillReceiveProps(nextProps);
      expect(spycomponentWillReceiveProps).toHaveBeenCalled();
    });
});
