export default (req, res, next) => {
  if (req.path === '/signin' || req.path === '/signup') {
    if (!req.body.email) {
      return res.status(400).send({
        success: false,
        error: 'Email must not be empty'
      });
    } else if (!req.body.password) {
      return res.status(400).send({
        success: false,
        error: 'Password must not be empty'
      });
    }
    next();
  }
};

