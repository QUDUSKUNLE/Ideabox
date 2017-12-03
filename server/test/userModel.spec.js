import assert from 'assert';
import chai from 'chai';
import should from 'should';
import dotenv from 'dotenv';
import User from '../models/User';
import userData from '../__mockData__/userData';


dotenv.config();
chai.should();

// Test for User model
describe('User model', () => {
  const { user } = userData;
  it('should create a new User', (done) => {
    const newUser = new User(user.signUp);
    newUser.save((err, createdUser) => {
      should.not.exist(err);
      createdUser.username.should.equal(user.signUp.username);
      createdUser.email.should.equal(user.signUp.email);
      done();
    });
  });

  it('should throw validation error when username filed is empty', (done) => {
    const newUser = new User(user.signUpEmptyUsername);
    newUser.save((err) => {
      assert.equal(err.errors.username.message, 'Path `username` is required.');
      should.exist(err);
      done();
    });
  });

  it('should throw validation error when password field is empty', (done) => {
    const newUser = new User(user.emptyPassword);
    newUser.save((err) => {
      assert.equal(err.errors.password.message, 'Path `password` is required.');
      should.exist(err);
      done();
    });
  });
  it('should throw validation error when email field is empty', (done) => {
    const newUser = new User(user.emptyEmail);
    newUser.save((err) => {
      assert.equal(err.errors.email.message, 'Path `email` is required.');
      should.exist(err);
      done();
    });
  });
});
