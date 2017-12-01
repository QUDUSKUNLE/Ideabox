import chai from 'chai';
import assert from 'assert';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import server from '../server';
import userData from '../__mockData__/userData';

dotenv.config();
chai.should();
const { expect } = chai;
chai.use(chaiHttp);

before((done) => {
  mongoose.createConnection(process.env.MONGODB_URL, () => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
});
// Test for UserControllers
describe('User Controller Test', () => {
  const { user } = userData;
  describe('User signup route', () => {
    it('should signup a new user', (done) => {
      chai.request(server)
        .post('/api/v1/user/signup')
        .set('Content-Type', 'application/json')
        .send({
          username: user.username,
          email: user.email,
          password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(true, res.body.success);
          res.body.should.have.property('message').equals('Sign up successful');
          done();
        });
    });
    it(
      'should return status 400 if password is less than 6 characters',
      (done) => {
        chai.request(server)
          .post('/api/v1/user/signup')
          .set('Content-Type', 'application/json')
          .send({
            username: user.username,
            password: user.shortPassword,
            email: user.email,
          })
          .end((err, res) => {
            res.should.have.status(400);
            expect(res.body.success).to.eql(false);
            res.body.error.should
              .equals('Password length must be more than 6 characters');
            done();
          });
      }
    );
    it(
      'should return status 400 if password is less than 6 characters',
      (done) => {
        chai.request(server)
          .post('/api/v1/user/signup')
          .set('Content-Type', 'application/json')
          .send({
            username: user.username,
            email: user.email,
            password: user.shortPassword,
          })
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal(false, res.body.success);
            res.body.should.have.property('error')
              .equals('Password length must be more than 6 characters');
            done();
          });
      }
    );
    it(
      'should return status 400 if password not defined',
      (done) => {
        chai.request(server)
          .post('/api/v1/user/signup')
          .type('application/json')
          .send({
            username: user.username,
            email: user.email
          })
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal(false, res.body.success);
            res.body.should.have.property('error')
              .equals('Either email, password or username is not provided');
            done();
          });
      }
    );
    it('should return status 400 if username is an empty string', (done) => {
      chai.request(server)
        .post('/api/v1/user/signup')
        .set('Content-Type', 'application/json')
        .send({
          username: user.emptyString,
          email: user.email,
          password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(false, res.body.success);
          res.body.should.have.property('error')
            .equals('Username field cannot be empty');
          done();
        });
    });
    it('should return status 409 if username already exist', (done) => {
      chai.request(server)
        .post('/api/v1/user/signup')
        .type('form')
        .send({
          username: user.username,
          email: user.usedMail,
          password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(409);
          assert.equal(false, res.body.success);
          res.body.should.have.property('error')
            .equals('Username already exist');
          done();
        });
    });
    it(
      'should return status 400 if username charcter is less than 2',
      (done) => {
        chai.request(server)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: user.shortName,
            email: user.email,
            password: user.password,
          })
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal(false, res.body.success);
            res.body.should.have.property('error')
              .equals('Username must be more than 2 characters');
            done();
          });
      }
    );
    it('should return status 400 if email is an empty string', (done) => {
      chai.request(server)
        .post('/api/v1/user/signup')
        .type('form')
        .send({
          username: user.username,
          email: user.emptyString,
          password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.success).to.eql(false);
          res.body.should.have.property('error')
            .equals('Email address field cannot be empty');
          done();
        });
    });
    it('should return status 400 if email is badly formatted', (done) => {
      chai.request(server)
        .post('/api/v1/user/signup')
        .type('form')
        .send({
          username: user.username,
          email: user.invalidEmail,
          password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.success).to.eql(false);
          res.body.should.have.property('error')
            .equals('Email is badly formatted');
          done();
        });
    });
    it('should return status 409 if email is already in use', (done) => {
      chai.request(server)
        .post('/api/v1/user/signup')
        .type('form')
        .send({
          username: user.username,
          email: user.email,
          password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(409);
          expect(res.body.success).to.eql(false);
          res.body.should.have.property('error')
            .equals('Email is already in use');
          done();
        });
    });
    it('should return status 400 if password is an empty string', (done) => {
      chai.request(server)
        .post('/api/v1/user/signup')
        .type('form')
        .send({
          username: user.username,
          password: user.emptyString,
          email: user.email,
        })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.success).to.eql(false);
          res.body.error.should.equals('Password field cannot be empty');
          done();
        });
    });
  });

  describe('User signin route', () => {
    it('should return status 400 if email or password not defined', (done) => {
      chai.request(server)
        .post('/api/v1/user/signin')
        .type('application/json')
        .send({
          username: user.username,
        })
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(false, res.body.success);
          res.body.should.have.property('error')
            .equals('Either email or password is required');
          done();
        });
    });

    it('should return status 404 if user does not exist', (done) => {
      chai.request(server)
        .post('/api/v1/user/signin')
        .type('application/json')
        .send({
          email: user.secondEmail,
          password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(false, res.body.success);
          res.body.should.have.property('error')
            .equals('User does not exist');
          done();
        });
    });

    it('should return status 401 if user sends wrong password', (done) => {
      chai.request(server)
        .post('/api/v1/user/signin')
        .type('application/json')
        .send({
          email: user.email,
          password: user.wrongPass,
        })
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(false, res.body.success);
          res.body.should.have.property('error')
            .equals('Email or password is incorrect');
          done();
        });
    });

    it('should return status 200 if a user sign in successfully', (done) => {
      chai.request(server)
        .post('/api/v1/user/signin')
        .type('application/json')
        .send({
          email: user.email,
          password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(true, res.body.success);
          assert.equal(res.body.userDetails.email, user.email);
          res.body.should.have.property('message')
            .equals('Sign in successful');
          done();
        });
    });
  });

  describe('User reset password route', () => {
    it('should return status 400 if email is not defined', (done) => {
      chai.request(server)
        .post('/api/v1/user/resetpassword')
        .type('application/json')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(false, res.body.success);
          res.body.should.have.property('error')
            .equals('Email is required');
          done();
        });
    });
    it('should return status 404 if user email does not exist', (done) => {
      chai.request(server)
        .post('/api/v1/user/resetpassword')
        .type('application/json')
        .send({ email: user.userEmail })
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(false, res.body.success);
          res.body.should.have.property('error')
            .equals('User does not exist');
          done();
        });
    });
    it('should return status 200 if reset password is successful', (done) => {
      chai.request(server)
        .post('/api/v1/user/resetpassword')
        .type('application/json')
        .send({ email: user.email })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(true, res.body.success);
          res.body.should.have.property('message')
            .equals('Reset password email sent successfully');
          done();
        });
    });
  });

  describe('User update password route', () => {
    it('should return status 400 when new password is not defined', (done) => {
      chai.request(server)
        .put('/api/v1/user/updatepassword/adekunelekkekkeke')
        .type('application/json')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(false, res.body.success);
          res.body.should.have.property('error')
            .equals('Either newPassword or confirmPassword is not provided');
          done();
        });
    });

    it('should return status 404 when does not exist', (done) => {
      chai.request(server)
        .put('/api/v1/user/updatepassword/adekunelekkekkeke')
        .type('application/json')
        .send({
          newPassword: user.userEmail,
          confirmPassword: user.userEmail
        })
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(false, res.body.success);
          res.body.should.have.property('error')
            .equals('User does not exist');
          done();
        });
    });
  });
});
