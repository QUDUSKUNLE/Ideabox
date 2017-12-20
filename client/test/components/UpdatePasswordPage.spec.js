import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UpdatePasswordPage from '../../src/components/UpdatePasswordPage';

Enzyme.configure({ adapter: new Adapter() });

describe('<UpdatePasswordPage />', () => {
  it('component should be defined', () => {
    expect(UpdatePasswordPage).toBeDefined();
  });

  it('should render correctly', () => {
    const component = shallow(<UpdatePasswordPage />);
    expect(component).toMatchSnapshot();
    expect(component.find('div')).toHaveLength(3);
  });
});
