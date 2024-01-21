const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the mongoDB!");
  })
  .catch(err => {
    console.log("Cannot connect to the mongoDB!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send('Resolvia Backend');
});

//require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

