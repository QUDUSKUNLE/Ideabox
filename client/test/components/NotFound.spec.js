import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NotFound from '../../src/components/NotFound';

Enzyme.configure({ adapter: new Adapter() });

describe('<NotFound/>', () => {
  it('component should be defined', () => {
    expect(NotFound).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<NotFound />);
    expect(component).toMatchSnapshot();
    expect(component.find('div')).toHaveLength(5);
  });
});
