var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
var { MONGODB_URL } = require("./config");
var userModel = require('./models/user_model');
var routes = require('./routes/index') 

const PORT = 5000;
const app = express();
const corsConfiguration = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}

app.use(cors(corsConfiguration)); // It is a middleware which is used by app to communicate to another port - (Cross Origin Resource Sharing)
app.use(express.json()); // It is a middleware which converts the request and response to JSON format

app.use(routes)

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Server has started on port: ${PORT}`);
    });
  } catch (err) {
    console.log("Error while starting server: ", err);
  }
};
startServer();
