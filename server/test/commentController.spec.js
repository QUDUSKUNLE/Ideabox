import chai from 'chai';
import assert from 'assert';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../server';
import userData from '../__mockData__/userData';

dotenv.config();
chai.should();
chai.use(chaiHttp);

// Test for CommentController

describe('Comment controller test:', () => {
  // Test for write comment route
  const { user } = userData;
  describe('Write comment route', () => {
    let uToken = '';
    let ideaId = '';
    before((done) => {
      chai.request(server)
        .post('/api/v1/users/signin')
        .send(user.signIn)
        .end((err, res) => {
          uToken = res.body.token;
          done();
        });
    });
    before((done) => {
      chai.request(server)
        .post('/api/v1/users/ideas')
        .set('x-access-token', uToken)
        .send(user.newIdea)
        .end((err, res) => {
          ideaId = res.body.createdIdea._id;
          done();
        });
    });
    it('should return status 201 when new comment is written', (done) => {
      chai.request(server)
        .post(`/api/v1/users/comments/${ideaId}`)
        .set('x-access-token', uToken)
        .set('Content-Type', 'application/json')
        .send(user.newComment)
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(true, res.body.success);
          assert.equal(
            user.newComment.comment,
            res.body.createdComment.comment
          );
          res.body.should.have.property('message').equals('Success');
          done();
        });
    });
    it('should return status 400 when comment is undefined', (done) => {
      chai.request(server)
        .post(`/api/v1/users/comments/${ideaId}`)
        .set('x-access-token', uToken)
        .set('Content-Type', 'application/json')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(false, res.body.success);
          assert.equal('Comment is not provided', res.body.error);
          done();
        });
    });
  });

  describe('Edit Comment route', () => {
    let uToken = '';
    let ideaId = '';
    let commentId = '';
    before((done) => {
      chai.request(server)
        .post('/api/v1/users/signin')
        .send(user.signIn)
        .end((err, res) => {
          uToken = res.body.token;
          done();
        });
    });
    before((done) => {
      chai.request(server)
        .post('/api/v1/users/ideas')
        .set('x-access-token', uToken)
        .send(user.Idea)
        .end((err, res) => {
          ideaId = res.body.createdIdea._id;
          done();
        });
    });
    before((done) => {
      chai.request(server)
        .post(`/api/v1/users/comments/${ideaId}`)
        .set('x-access-token', uToken)
        .send(user.sendComment)
        .end((err, res) => {
          commentId = res.body.createdComment._id;
          done();
        });
    });
    it('should return Success when comment is successfully edited', (done) => {
      chai.request(server)
        .put(`/api/v1/users/comments/${commentId}`)
        .set('x-access-token', uToken)
        .set('Content-Type', 'application/json')
        .send(user.editComment)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(true, res.body.success);
          res.body.should.have.property('message').equals('Success');
          done();
        });
    });
    it('should return comment not found when commentId is invalid', (done) => {
      const invalidCommentId = commentId.slice(0, -1);
      chai.request(server)
        .put(`/api/v1/users/comments/${invalidCommentId}`)
        .set('x-access-token', uToken)
        .set('Content-Type', 'application/json')
        .send(user.editComment)
        .end((err, res) => {
          assert.equal(false, res.body.success);
          res.body.should.have.property('error').equals('Comment not Found');
          done();
        });
    });
  });
  describe('Delete Comment route', () => {
    let uToken = '';
    let ideaId = '';
    let commentId = '';
    before((done) => {
      chai.request(server)
        .post('/api/v1/users/signin')
        .send(user.signIn)
        .end((err, res) => {
          uToken = res.body.token;
          done();
        });
    });
    before((done) => {
      chai.request(server)
        .post('/api/v1/users/ideas')
        .set('x-access-token', uToken)
        .send(user.Idea2)
        .end((err, res) => {
          ideaId = res.body.createdIdea._id;
          done();
        });
    });
    before((done) => {
      chai.request(server)
        .post(`/api/v1/users/comments/${ideaId}`)
        .set('x-access-token', uToken)
        .send(user.sendComment)
        .end((err, res) => {
          commentId = res.body.createdComment._id;
          done();
        });
    });
    it('should return Success when comment is deleted successfully', (done) => {
      chai.request(server)
        .delete(`/api/v1/users/comments/${commentId}`)
        .set('x-access-token', uToken)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(true, res.body.success);
          res.body.should.have.property('message').equals('Success');
          done();
        });
    });
  });
});
