import chai from 'chai';
import assert from 'assert';
import chaiHttp from 'chai-http';
import server from '../server';
import userData from '../__mockData__/userData';


chai.should();
chai.use(chaiHttp);

// Test for IdeaController
describe('Idea Controller Test:', () => {
  const { user } = userData;
  // Test for create Idea route
  describe('Create idea route', () => {
    let validToken = '';
    before((done) => {
      chai.request(server)
        .post('/api/v1/users/signin')
        .send(user.signIn)
        .end((err, res) => {
          if (err) return done(err);
          validToken = res.body.token;
          done();
        });
    });
    it('should return status 201 when new idea is created', (done) => {
      chai.request(server)
        .post('/api/v1/users/ideas')
        .set('x-access-token', validToken)
        .set('Content-Type', 'application/json')
        .send(user.createIdea)
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(true, res.body.success);
          assert.equal(user.title, res.body.createdIdea.title);
          assert.equal(user.description, res.body.createdIdea.description);
          res.body.should.have.property('message')
            .equals('Your Idea has been created successfully');
          done();
        });
    });
    it('should return status 400 when idea title is undefined', (done) => {
      chai.request(server)
        .post('/api/v1/users/ideas')
        .set('x-access-token', validToken)
        .set('Content-Type', 'application/json')
        .send({
          description: user.description,
          category: user.category,
          access: user.access
        })
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(false, res.body.success);
          done();
        });
    });
    it(`should return Access must be public or private when user
    passes other acccess apart from public or private`, (done) => {
        chai.request(server)
          .post('/api/v1/users/ideas')
          .set('x-access-token', validToken)
          .set('Content-Type', 'application/json')
          .send(user.incorrectAccess)
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal(false, res.body.success);
            res.body.should.have.property('error')
              .equals('Access must be public or private');
            done();
          });
      });
    it(`should return title must be unique when
    user sends title that already exist`, (done) => {
        chai.request(server)
          .post('/api/v1/users/ideas')
          .set('x-access-token', validToken)
          .set('Content-Type', 'application/json')
          .send(user.existingTitle)
          .end((err, res) => {
            res.should.have.status(409);
            assert.equal(false, res.body.success);
            res.body.should.have.property('message')
              .equals('Idea title must be unique');
            done();
          });
      });
  });
  describe('Search idea route', () => {
    let validToken = '';
    before((done) => {
      chai.request(server)
        .post('/api/v1/users/signin')
        .send(user.signIn)
        .end((err, res) => {
          if (err) return done(err);
          validToken = res.body.token;
          done();
        });
    });
    it('should return 200 when search ideas by keywords', (done) => {
      chai.request(server)
        .get('/api/v1/users/ideas?category=AbdruShin')
        .set('x-access-token', validToken)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(true, res.body.success);
          done();
        });
    });
  });

  describe('Filter for idea route', () => {
    let validToken = '';
    before((done) => {
      chai.request(server)
        .post('/api/v1/users/signin')
        .send(user.signIn)
        .end((err, res) => {
          if (err) return done(err);
          validToken = res.body.token;
          done();
        });
    });
    it('should return 400 if filterTerm is undefined', (done) => {
      chai.request(server)
        .post('/api/v1/users/ideas/search?offset=0&limit=5')
        .set('x-access-token', validToken)
        .set('Content-Type', 'application/json')
        .send({ category: 'AbdruShin' })
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(res.body.success, false);
          assert.equal(res.body.error, 'Please add filter term');
          done();
        });
    });
    it('should return 200 when filter ideas by category ', (done) => {
      chai.request(server)
        .post('/api/v1/users/ideas/search?offset=0&limit=5')
        .set('x-access-token', validToken)
        .set('Content-Type', 'application/json')
        .send({ filterTerm: 'The Book of Grail', category: 'AbdruShin' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('ideas');
          done();
        });
    });
  });

  describe('Update idea route', () => {
    let validToken = '';
    let ideaId = '';
    before((done) => {
      chai.request(server)
        .post('/api/v1/users/signin')
        .send(user.signIn)
        .end((err, res) => {
          if (err) return done(err);
          validToken = res.body.token;
          done();
        });
    });
    before((done) => {
      chai.request(server)
        .post('/api/v1/users/ideas')
        .set('x-access-token', validToken)
        .set('Content-Type', 'application/json')
        .send(user.Idea1)
        .end((err, res) => {
          if (err) return done(err);
          ideaId = res.body.createdIdea._id;
          done();
        });
    });
    it(`should return Idea updated successfully when user
    updated an idea successfully`, (done) => {
        chai.request(server)
          .put(`/api/v1/users/ideas/${ideaId}`)
          .set('x-access-token', validToken)
          .set('Content-Type', 'application/json')
          .send(user.updateIdea)
          .end((err, res) => {
            res.should.have.status(200);
            assert.equal(true, res.body.success);
            assert.equal('edited', res.body.status);
            res.body.should.have.property('message')
              .equals('Idea updated successfully');
            done();
          });
      });
    it(`should return idea not found when user passes wrong
    ideaId when updating idea`, (done) => {
        const wrongIdeaId = ideaId.slice(0, -1);
        chai.request(server)
          .put(`/api/v1/users/ideas/${wrongIdeaId}`)
          .set('x-access-token', validToken)
          .set('Content-Type', 'application/json')
          .send(user.createIdea)
          .end((err, res) => {
            assert.equal(false, res.body.success);
            res.body.should.have.property('error')
              .equals('Idea not Found');
            done();
          });
      });
    it('should return status 400 when idea title is undefined', (done) => {
      chai.request(server)
        .put(`/api/v1/users/ideas/${ideaId}`)
        .set('x-access-token', validToken)
        .set('Content-Type', 'application/json')
        .send(user.undefineTitle)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(false, res.body.success);
          done();
        });
    });
    it(`should return Access must be public or private when user
    passes other acccess apart from public or private`, (done) => {
        chai.request(server)
          .put(`/api/v1/users/ideas/${ideaId}`)
          .set('x-access-token', validToken)
          .set('Content-Type', 'application/json')
          .send(user.incorrectAccess)
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal(false, res.body.success);
            res.body.should.have.property('error')
              .equals('Access must be public or private');
            done();
          });
      });
    it('should return 401 when idea Id is invalid', (done) => {
      const wrongIdeaId = ideaId.slice(0, -1);
      chai.request(server)
        .delete(`/api/v1/users/ideas/${wrongIdeaId}`)
        .set('x-access-token', validToken)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(res.body.success, false);
          assert.equal('Unathorized, invalid idea identity', res.body.message);
          done();
        });
    });
    it('should return 202 when idea is deleted an idea', (done) => {
      chai.request(server)
        .delete(`/api/v1/users/ideas/${ideaId}`)
        .set('x-access-token', validToken)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          res.should.have.status(202);
          assert.equal(res.body.success, true);
          assert.equal('Idea deleted successfully', res.body.message);
          done();
        });
    });
  });
});
