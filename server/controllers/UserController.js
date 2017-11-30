import dotenv from 'dotenv';
import capitalize from 'capitalize';
import bcrypt from 'bcrypt';
import User from '../models/User';
import GenerateToken from '../utils/GenerateToken';

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
                      token: GenerateToken(newUser),
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
        error: 'Either email or password is not provided',
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
              error: 'User not Found'
            });
          }
          // compare passwords
          if (!bcrypt.compareSync(req.body.password, response.password)) {
            return res.status(400).send({
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
            token: GenerateToken(response),
            userDetails
          });
        });
    }
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
