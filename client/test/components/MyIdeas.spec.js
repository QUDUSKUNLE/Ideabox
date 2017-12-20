import React from 'react';
import 'babel-polyfill';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyIdeas from '../../src/components/MyIdeas';

Enzyme.configure({ adapter: new Adapter() });

describe('MyIdeas page component', () => {
  let props;
  let mountedMyIdeasPage;
  const mountMyIdeasPage = () => {
    if (!mountedMyIdeasPage) {
      mountedMyIdeasPage = shallow(<MyIdeas {...props} />);
    }
    return mountedMyIdeasPage;
  };

  beforeEach(() => {
    props = {
      history: {
        push: jest.fn()
      },
      pageInfo: {},
      username: 'kunle',
      myIdeas: [],
      Materialize: {
        toast: jest.fn()
      }
    };
  });

  it('should always render a div', () => {
    const component = mountMyIdeasPage().find('div');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should contain a handlePageClick method', () => {
    const pages = 12;
    const component = shallow(<MyIdeas {...props} />);
    const handlePageClickSpy =
      jest.spyOn(component.instance(), 'handlePageClick');
    component.instance().handlePageClick(pages);
    expect(handlePageClickSpy).toHaveBeenCalled();
  });

  it('should contain a handleDelete method', () => {
    const ideaId = 'abcdefghijkl';
    const component = shallow(<MyIdeas {...props} />);
    const handleDeleteSpy =
      jest.spyOn(component.instance(), 'handleDelete');
    component.instance().handleDelete(ideaId);
    expect(handleDeleteSpy).toHaveBeenCalled();
  });

  it('should contain a handleEdit method', () => {
    const ideaId = 'abcdefghijkl';
    const component = shallow(<MyIdeas {...props} />);
    const handleEditSpy =
      jest.spyOn(component.instance(), 'handleEdit');
    component.instance().handleEdit(ideaId);
    expect(handleEditSpy).toHaveBeenCalled();
  });

  it('should contain a handleLogOut method', () => {
    const component = shallow(<MyIdeas {...props} />);
    const handleLogOutSpy =
      jest.spyOn(component.instance(), 'handleLogOut');
    component.instance().handleLogOut();
    expect(handleLogOutSpy).toHaveBeenCalled();
  });

  it('should contain a handleDeleteResponse method', () => {
    const component = shallow(<MyIdeas {...props} />);
    const handleDeleteResponseSpy =
      jest.spyOn(component.instance(), 'handleDeleteResponse');
    component.instance().handleDeleteResponse();
    expect(handleDeleteResponseSpy).toHaveBeenCalled();
  });

  it('should contain a handleMyIdeasResponse method', () => {
    const component = shallow(<MyIdeas {...props} />);
    const handleMyIdeasResponseSpy =
      jest.spyOn(component.instance(), 'handleMyIdeasResponse');
    component.instance().handleMyIdeasResponse();
    expect(handleMyIdeasResponseSpy).toHaveBeenCalled();
  });
});
