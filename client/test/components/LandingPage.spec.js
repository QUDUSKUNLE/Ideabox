import React from 'react';
import 'babel-polyfill';
import { shallow } from 'enzyme';
import LandingPage from '../../src/components/LandingPage';

describe('Landing page component', () => {
  let props;
  let mountedLandingPage;
  const mountLandingPage = () => {
    if (!mountedLandingPage) {
      mountedLandingPage = shallow(<LandingPage {...props} />);
    }
    return mountedLandingPage;
  };

  beforeEach(() => {
    props = {
      history: {
        push: jest.fn()
      }
    };
  });

  it('should always render a div', () => {
    const component = mountLandingPage().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  // it('should contain a componentDidMount method', () => {
  //   const component = shallow(<LandingPage {...props} />);
  //   console.log(component);
  //   const componentDidMountSpy =
  //   jest.spyOn(component.instance(), 'openRegister');
  //   component.dive().instance().openRegister();
  //   expect(componentDidMountSpy).toHaveBeenCalled();
  // });
});
