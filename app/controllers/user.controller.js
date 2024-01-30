//const db = require('./app/models');

// export const getUser = (req,res,next) => {
//     const
//     if (!req.body){

//     }
// };

// export const addUser = user => {
//   console.log(user);
// };

export const test = (req, res) => {
  res.json({ message: 'Test API' });
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};


