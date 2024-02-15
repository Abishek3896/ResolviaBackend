const express = require('express');
const cors = require('cors');
const UserRoutes = require('./app/routes/user.routes.js');
const AuthRoutes = require('./app/routes/auth.routes.js');
const ResolveRoutes = require('./app/routes/resolve.routes.js');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors(
  {origin:process.env.CLIENT_URL}
));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log('Connected to the mongoDB!');
  })
  .catch(err => {
    console.log('Cannot connect to the mongoDB!', err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.send('Resolvia Backend');
});

//require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use('/api/user', UserRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/resolve', ResolveRoutes);

app.use((err, req, res, next) => {
  //console.log(req.cookies);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
