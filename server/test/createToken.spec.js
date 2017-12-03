import chai from 'chai';
import chaiHttp from 'chai-http';
import createToken from '../utils/createToken';
import userData from '../__mockData__/userData';

chai.should();
const { expect } = chai;
chai.use(chaiHttp);

// Test for createToken
describe('CreateToken', () => {
  const { user } = userData;
  const token = createToken(user.demoUser);
  it('is expected to be a function', () => {
    expect(createToken).to.be.a('function');
  });
  it('should generate a token when called', () => {
    expect(typeof token).to.be.an('string');
  });

  it('should generate a token with length greater than zero', () => {
    expect(token).not.to.have.length(0);
  });
});
