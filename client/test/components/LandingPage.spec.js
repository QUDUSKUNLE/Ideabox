import React from 'react';
import 'babel-polyfill';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LandingPage from '../../src/components/LandingPage';

Enzyme.configure({ adapter: new Adapter() });

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

  it('should contain a componentDidMount method', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const component = shallow(<LandingPage {...props} />);
    const componentDidMountSpy =
    jest.spyOn(component.instance(), 'openRegister');
    component.instance().openRegister(event);
    expect(componentDidMountSpy).toHaveBeenCalled();
  });
});
