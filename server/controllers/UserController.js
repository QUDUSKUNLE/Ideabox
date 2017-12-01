import bcrypt from 'bcrypt';
import capitalize from 'capitalize';
import crypto from 'crypto';
import dotenv from 'dotenv';
import createToken from '../utils/createToken';
import sendMail from '../utils/sendEmail';
import User from '../models/User';

dotenv.config();

/**
 * @class UserController
 */
class UserController {
  /**
   * signup a new user
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void} json server response
   */
  static signUp(req, res) {
    if ((req.body.username === undefined) ||
      (req.body.email === undefined) ||
      (req.body.password === undefined)) {
      res.status(400).send({
        error: 'Either email, password or username is not provided',
        success: false
      });
    } else {
      User.findOne({
        email: req.body.email
      })
        .exec()
        .then((email) => {
          if (email) {
            res.status(409).send({
              error: 'Email is already in use',
              success: false
            });
          } else {
            User.findOne({
              username: capitalize(req.body.username)
            })
              .exec()
              .then((username) => {
                if (username) {
                  res.status(409).send({
                    error: 'Username already exist',
                    success: false
                  });
                } else {
                  const user = new User({
                    username: capitalize(req.body.username),
                    password: req.body.password,
                    email: req.body.email
                  });
                  user.save((err, newUser) => {
                    if (err) {
                      return res.status(500).send({
                        success: false,
                        message: err
                      });
                    }
                    const userDetails = {
                      username: newUser.username,
                      email: newUser.email
                    };
                    return res.status(201).send({
                      message: 'Sign up successful',
                      success: true,
                      token: createToken(newUser),
                      userDetails
                    });
                  });
                }
              });
          }
        });
    }
  }
  /**
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void} json server response
   */
  static signIn(req, res) {
    if ((req.body.email === undefined) ||
      (req.body.password === undefined)) {
      res.status(400).send({
        error: 'Either email or password is required',
        success: false
      });
    } else {
      User.findOne({
        email: req.body.email
      })
        .exec((err, response) => {
          if (err) {
            return res.status(500).send({
              success: false,
              error: 'internal server error'
            });
          }
          if (!response) {
            return res.status(404).send({
              success: false,
              error: 'User does not exist'
            });
          }
          // compare passwords
          if (!bcrypt.compareSync(req.body.password, response.password)) {
            return res.status(401).send({
              success: false,
              error: 'Email or password is incorrect'
            });
          }
          const userDetails = {
            username: response.username,
            email: response.email
          };
          return res.status(200).send({
            message: 'Sign in successful',
            success: true,
            token: createToken(response),
            userDetails
          });
        });
    }
  }


  /**
   * Send Reset password email
   * Routes: POST: /api/v1/user/resetpassword
   * @param {object} req
   * @param {object} res
   * @returns {response} response object
   */
  static sendResetPassword(req, res) {
    const hash = crypto.randomBytes(20).toString('hex');
    const date = Date.now() + 3600000;
    if (req.body.email === undefined) {
      return res.status(400).send({
        success: false,
        error: 'Email is required'
      });
    }
    User.findOne({
      email: req.body.email
    })
      .exec((err, response) => {
        if (err) {
          return res.status(500).send({
            success: false,
            error: 'internal server error'
          });
        }
        if (!response) {
          return res.status(404).send({
            success: false,
            error: 'User does not exist'
          });
        }
        response.hash = hash;
        response.expiryTime = date;
        response.save((error, updatedUser) => {
          if (error) {
            return res.status(400).send({
              success: false,
              message: error
            });
          }
          // send mail to the user
          sendMail(
            updatedUser.email,
            updatedUser.username,
            hash, req.headers.host
          );
          return res.status(200).send({
            success: true,
            message: 'Reset password email sent successfully'
          });
        });
      }).catch(error => res.status(500).send({ message: error.message }));
  }

  /**
   * Update Password
   * Route: POST: /api/v1/user/updatepassword/:hash
   * @param {object} req
   * @param {object} res
   * @return {void}
   */
  static updatePassword(req, res) {
    if ((req.body.newPassword === undefined) ||
       (req.body.confirmPassword === undefined)) {
      return res.status(400).send({
        error: 'Either newPassword or confirmPassword is not provided',
        success: false
      });
    }
    return User.findOne({ hash: req.params.hash })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            success: false,
            error: 'User does not exist'
          });
        }
        if (
          req.body.newPassword &&
          req.body.confirmPassword &&
          req.body.newPassword === req.body.confirmPassword
        ) {
          const currentTime = Date.now();

          if (currentTime > user.expiryTime) {
            return res.status(410).send({
              success: false,
              error: 'Expired link'
            });
          }
          user.password = req.body.newPassword;
          user.save((err, updatedUser) => {
            if (err) {
              return res.status(400).send({
                success: false,
                error: err.message
              });
            }

            res.status(201).send({
              success: true,
              message: 'Password has been updated',
              updatedUser
            });
          });
        } else {
          return res.status(400).send({
            success: false,
            error: 'Please confirm password'
          });
        }
      })
      .catch(error => res.status(500).send({
        success: false,
        error: error.message
      }));
  }


  /**
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void} json server response
   */
  static updateProfile(req, res) {
    const { newUsername, newPassword } = req.body;
    User.findOne({
      email: req.body.email
    })
      .exec()
      .then((user) => {
        if (user) {
          const update = new User({
            username: capitalize(newUsername),
            password: newPassword
          });
          update.update().then((err, response) => {
            if (err) {
              return res.status(500).send({
                success: false,
                message: err
              });
            }
            return res.status(201).send({
              message: 'Update successful',
              success: true,
              user: response,
            });
          });
        }
        return res.status(422)
          .send({ message: 'User not found', success: false });
      });
  }
}

export default UserController;
