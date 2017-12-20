import React from 'react';
import 'babel-polyfill';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DashBoard from '../../src/components/DashBoard';
import mockData from '../../mock/mockData';

Enzyme.configure({ adapter: new Adapter() });

describe('DashBoard component', () => {
  let props;
  let mountedDashBoard;
  const mountDashBoard = () => {
    if (!mountedDashBoard) {
      mountedDashBoard = shallow(<DashBoard {...props} />);
    }
    return mountedDashBoard;
  };

  beforeEach(() => {
    props = {
      history: {
        push: jest.fn()
      },
      publicIdeas: mockData.public,
      ideaLimit: 6,
      pageInfo: {},
      category: '',
      categoryIsClicked: false
    };
  });

  it('should always render a div', () => {
    const component = mountDashBoard().find('div');
    expect(component.length).toBeGreaterThan(0);
  });


  it('should contain a handlePageClick method', () => {
    const pages = 12;
    const component = shallow(<DashBoard {...props} />);
    const handlePageClickSpy =
      jest.spyOn(component.instance(), 'handlePageClick');
    component.instance().handlePageClick(pages);
    expect(handlePageClickSpy).toHaveBeenCalled();
  });

  it('should contain a handlePublicRevert method', () => {
    const component = shallow(<DashBoard {...props} />);
    const handlePublicRevertSpy =
      jest.spyOn(component.instance(), 'handlePublicRevert');
    component.instance().handlePublicRevert();
    expect(handlePublicRevertSpy).toHaveBeenCalled();
  });

  it('should has handleLogOut method', () => {
    const component = shallow(<DashBoard {...props} />);
    const handleLogOutSpy =
      jest.spyOn(component.instance(), 'handleLogOut');
    component.instance().handleLogOut();
    expect(handleLogOutSpy).toHaveBeenCalled();
  });

  it('should contain a handleClickCategory method', () => {
    const category = 'Technology';
    const component = shallow(<DashBoard {...props} />);
    const handleClickCategorySpy =
      jest.spyOn(component.instance(), 'handleClickCategory');
    component.instance().handleClickCategory(category);
    expect(handleClickCategorySpy).toHaveBeenCalled();
  });

  it('should contain a componentDidMount method', () => {
    const component = shallow(<DashBoard {...props} />);
    const componentDidMountSpy =
      jest.spyOn(component.instance(), 'componentDidMount');
    component.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalled();
  });

  it('should contain a componentWillUnmount method', () => {
    const component = shallow(<DashBoard {...props} />);
    const componentWillUnmountSpy =
      jest.spyOn(component.instance(), 'componentWillUnmount');
    component.instance().componentWillUnmount();
    expect(componentWillUnmountSpy).toHaveBeenCalled();
  });
});
