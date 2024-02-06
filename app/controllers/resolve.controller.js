const errorHandler = require('../middleware/error.js');
const Resolve = require('../models/resolve.model.js');
const AWS = require('aws-sdk');

const create = async (req, res, next) => {
  //console.log(req.user);
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newResolve = new Resolve({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedResolve = await newResolve.save();
    res.status(201).json(savedResolve);
  } catch (error) {
    next(error);
  }
};

const uploadFile = (req, res, next) => {
  //console.log('File uploaded', req.file);
  // Create unique bucket name
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  // Create name for uploaded object key
  const filenamearray = req.file.originalname.split('.');
  const uniquename =
    filenamearray[0].split(' ').join('') + Math.random().toString(9).slice(-4);
  const keyName = uniquename + '.' + filenamearray[filenamearray.length - 1];
  //console.log(keyName);
  // Create a promise on S3 service object
  const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

  const uploadParams = {
    Bucket: bucketName,
    Key: keyName,
    Body: req.file.buffer,
    ACL: 'public-read',
    ContentType: req.file.mimetype,
  };

  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function (err, data) {
    if (err) {
      next(err);
    }
    if (data) {
      //console.log(data);
      const url = data.Location.replace(
        process.env.S3_BASE_URL,
        process.env.CLOUDFRONT_BASE_URL
      );
      res.status(200).json(url);
    }
  });
};

module.exports = { create, uploadFile };
