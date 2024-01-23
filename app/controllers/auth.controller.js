const User = require('../models/user.model.js');
const bcryptjs = require('bcryptjs');
const error = require('../middleware/error.js');
const jwt = require('jsonwebtoken');
const signup = async (req, res, next) => {
  const { username, email, mobileNum, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(error(400, 'All fields are required'));
  }

  const salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(password, salt);

  const newUser = new User({
    username,
    email,
    mobileNum,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json('SignUp successfull');
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password || username === '' || password === '') {
    next(error(400, 'All fields are required'));
  }
  try {
    const validUser = await User.findOne({ username });
    if (!validUser) {
      return next(error(404, 'User Not Valid'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(error(400, 'Invalid Password'));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
module.exports = { signup, signin };