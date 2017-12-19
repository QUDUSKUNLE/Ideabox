import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../src/components/NotFound';

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
