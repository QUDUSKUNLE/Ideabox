import React from 'react';
import 'babel-polyfill';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserIdeasSideNav from '../../src/components/container/UserIdeasSideNav';

Enzyme.configure({ adapter: new Adapter() });

describe('UserIdeasSideNav component', () => {
  let props;
  let mountedUserIdeasSideNav;
  const mountUserIdeasSideNav = () => {
    if (!mountedUserIdeasSideNav) {
      mountedUserIdeasSideNav = shallow(<UserIdeasSideNav {...props} />);
    }
    return mountedUserIdeasSideNav;
  };

  beforeEach(() => {
    props = {
      history: {
        push: jest.fn()
      },
      handleLogOut: jest.fn(),
      username: 'Kunle'
    };
  });

  it('should always render a div', () => {
    const component = mountUserIdeasSideNav().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should contain a componentDidMount method', () => {
    const component = shallow(<UserIdeasSideNav {...props} />);
    const componentDidMountSpy =
      jest.spyOn(component.instance(), 'componentDidMount');
    component.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalled();
  });
});
