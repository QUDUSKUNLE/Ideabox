import chai from 'chai';
import pagination from '../helpers/pagination';
import userData from '../__mockData__/userData';

chai.should();
chai.should();
const { expect } = chai;

// Test for pagination function
describe('Pagination ', () => {
  const { user } = userData;
  it('is expected', () => {
    expect(pagination).to.be.a('function');
  });
  it(`function should return page, pageCount, pageSize 
  and count when called`, (done) => {
      expect(pagination(user.count, user.limit, user.offset))
        .to.have.keys(['page', 'pageCount', 'pageSize', 'count']);
      done();
    });
  it('function should return an object when called', (done) => {
    expect(pagination(user.count, user.limit, user.offset)).to.be.an('object');
    done();
  });
  it('function should return', (done) => {
    expect(pagination(user.count, user.limit, user.offset))
      .to.eql({
        page: 1, pageCount: 1, pageSize: 5, count: user.count
      });
    done();
  });
});
