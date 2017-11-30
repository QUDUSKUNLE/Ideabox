/* eslint-disable */
/**
 * validate - description
 * @param  {object} request the form data to be validated
 * @return {object}  {} containing error and isValid
 */
const validateRequest = (request) => {
  if (Object.hasOwnProperty.call(request, 'body')) {
    for (const key in request.body) {
      switch (key) {
        case 'username':
          request.check('username', 'Username is required')
            .trim()
            .notEmpty()
            .matches(/\w/);
          request.check('username', 'Username should be at least 2 characters')
            .trim()
            .isLength(2, 50);
          break;

        case 'email':
          request.check('email', 'User email is required')
            .trim()
            .notEmpty();
          request.check('email', 'Email is badly formatted').isEmail();
          break;

        case 'password':
          request.check('password', 'Password is required')
            .trim()
            .notEmpty();
          request.check(
            'password',
            'Password length must be more than 6 characters'
          ).isLength({ min: 7 }).matches(/\w/);
          break;
        default:
      }
    }
  }
  return request.validationErrors();
};

/**
 * @description This validates all request inputs
 * @param { object } req
 * @param { object } res
 * @param { function } next
 * @function  validateRequestBody
 * @return { object } return object containing validation error message
 */
const Validator = (req, res, next) => {
  const errors = validateRequest(req);
  if (errors) {
    const message = errors[0].msg;
    res.status(400).send({ error: message, success: false });
  } else {
    next();
  }
};

export default Validator;
