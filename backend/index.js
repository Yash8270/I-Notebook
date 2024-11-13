const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
const bodyParser = require("body-parser")

connectToMongo();

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
