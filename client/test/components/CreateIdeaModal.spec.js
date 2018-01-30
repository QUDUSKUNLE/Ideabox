import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateIdeaModal
  from '../../src/components/container/modal/CreatIdeaModal';

Enzyme.configure({ adapter: new Adapter() });

describe('CreateIdeaModal', () => {
  it('component should be defined', () => {
    expect(CreateIdeaModal).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<CreateIdeaModal />);
    expect(component).toMatchSnapshot();
    expect(component.find('div')).toHaveLength(1);
  });
});
