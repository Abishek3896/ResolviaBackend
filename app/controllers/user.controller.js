

const test = (req, res) => {
  res.json({ message: 'Test API' });
};

const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};

module.exports={test,signout};


