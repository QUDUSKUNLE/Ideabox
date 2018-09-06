import jwt from 'jsonwebtoken';

/**
 * @description This function generates token
 * @param {Object} user request object
 * @return {string} Token
 */
export default (user) => {
  const Token = jwt.sign(
    { token: { user } }, process.env.SECRET_TOKEN,
    { expiresIn: '24h' }
  );
  return Token;
};
