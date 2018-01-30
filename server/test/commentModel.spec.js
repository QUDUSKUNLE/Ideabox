import chai from 'chai';
import should from 'should';
import dotenv from 'dotenv';
import Comment from '../models/Comment';
import userData from '../__mockData__/userData';

dotenv.config();
chai.should();
chai.should();
const { expect } = chai;
// Test for Comment model
describe('Comment model', () => {
  const { user } = userData;
  it('should be able to create a new comment', (done) => {
    new Comment(user.newComment1).save((err, createdComment) => {
      should.not.exist(err);
      expect(createdComment.comment).to.eql(user.newComment1.comment);
      done();
    });
  });
  it('should throw validation error when comment field is empty', (done) => {
    new Comment(user.newComment2).save((err) => {
      should.exist(err);
      expect(err.errors.comment.message).to.eql('Path `comment` is required.');
      done();
    });
  });
});
