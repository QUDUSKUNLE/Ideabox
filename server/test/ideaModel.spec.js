import assert from 'assert';
import chai from 'chai';
import should from 'should';
import dotenv from 'dotenv';
import Idea from '../models/Idea';
import userData from '../__mockData__/userData';
import User from '../models/User';

dotenv.config();
chai.should();
chai.should();
const { expect } = chai;
// Test for Idea model
describe('Idea model', () => {
  const { user } = userData;
  let authorId = '';
  let author = '';
  before((done) => {
    const createUser = new User(user.signUp);
    createUser.save((err, createdUser) => {
      authorId = createUser._id;
      author = createdUser.username;
      done();
    });
  });
  it('should be able to create a new Idea', (done) => {
    // Set author id and name
    user.newIdea1.author = { id: authorId, name: author };
    const newIdea = new Idea(user.newIdea1);
    newIdea.save((err, createdIdea) => {
      should.not.exist(err);
      expect(createdIdea.title).to.eql(user.newIdea1.title);
      createdIdea.description.should.equal(user.newIdea1.description);
      createdIdea.author.id.should.equal(authorId);
      done();
    });
  });

  it('should throw validation error if an idea with a title exist', (done) => {
    // Set author id and name
    user.newIdea1.author = { id: authorId, name: author };
    const newIdea = new Idea(user.newIdea1);
    newIdea.save((err) => {
      should.exist(err);
      done();
    });
  });

  it('should throw validation error if authorId is invalid', (done) => {
    // Set authorId field to an invalid string
    const invalidId = authorId.toString().slice(0, -1);
    user.newIdea1.author = { id: invalidId, name: author };
    const newIdea = new Idea(user.newIdea1);
    newIdea.save((err) => {
      should.exist(err);
      done();
    });
  });

  it('should throw validation error when title field is empty', (done) => {
    new Idea(user.newIdea2).save((err) => {
      should.exist(err);
      expect(err.errors.title.message).to.eql('Path `title` is required.');
      done();
    });
  });

  it(
    'should throw validation error when description field is empty',
    (done) => {
      new Idea(user.newIdea3).save((err) => {
        assert.equal(
          err.errors.description.message,
          'Path `description` is required.'
        );
        should.exist(err);
        done();
      });
    }
  );
});
