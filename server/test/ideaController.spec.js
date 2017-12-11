import chai from 'chai';
import assert from 'assert';
import chaiHttp from 'chai-http';
import server from '../server';
import userData from '../__mockData__/userData';


chai.should();
chai.use(chaiHttp);
const { expect } = chai;
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
  // describe('Search idea route', () => {
  //   // let validToken = '';
  //   before((done) => {
  //     chai.request(server)
  //       .post('/api/v1/users/signin')
  //       .send(user.signIn)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         validToken = res.body.token;
  //         done();
  //       });
  //   });
  //   // it('should return 200 when search ideas by keywords', (done) => {
  //   //   chai.request(server)
  //   //     .get('/api/v1/users/ideas?category=AbdruShin')
  //   //     .set('x-access-token', validToken)
  //   //     .set('Content-Type', 'application/json')
  //   //     .end((err, res) => {
  //   //       res.should.have.status(200);
  //   //       assert.equal(true, res.body.success);
  //   //       done();
  //   //     });
  //   // });
  // });

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
    it('should return 200 when filter query returns match idea', (done) => {
      chai.request(server)
        .get(`/api/v1/users/ideas?category=
        ${user.filterMockData.category}&offset=
        ${user.filterMockData.offset}&limit=
        ${user.filterMockData.limit}`)
        .set('x-access-token', validToken)
        .set('Content-Type', 'application/json')
        .send({ category: 'AbdruShin' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('pageInfo');
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
  });

  describe('Public idea route', () => {
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
    it('should return 200 when fetch all public ideas', (done) => {
      chai.request(server)
        .get('/api/v1/users/ideas/public?offset=0&limit=5')
        .set('x-access-token', validToken)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('pageInfo');
          done();
        });
    });
  });
  describe('User ideas route', () => {
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

    it(`should return 200 when user/ideas is call and return
     all ideas by the user`, (done) => {
        chai.request(server)
          .get('/api/v1/users/ideas/user/ideas?offset=0&limit=6')
          .set('x-access-token', validToken)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('pageInfo');
            done();
          });
      });
    it(
      'should return 200 when an idea is fetched succesffuly and the idea id',
      (done) => {
        chai.request(server)
          .get(`/api/v1/users/ideas/${ideaId}`)
          .set('x-access-token', validToken)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body.success, true);
            expect(res.body.idea._id).to.eql(ideaId);
            done();
          });
      }
    );
    it(
      'should return 401 when an idea to be fetched is invalid',
      (done) => {
        const invalidIdeaId = ideaId.slice(0, -1);
        chai.request(server)
          .get(`/api/v1/users/ideas/${invalidIdeaId}`)
          .set('x-access-token', validToken)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            res.should.have.status(401);
            assert.equal(res.body.success, false);
            expect(res.body.message)
              .to.eql('Unathorized, invalid idea identity');
            done();
          });
      }
    );
    it('should return 202 when an idea is deleted successfully', (done) => {
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
