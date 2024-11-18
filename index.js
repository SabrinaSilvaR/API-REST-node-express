const express = require('express');
const routeApi = require('./routes');
const cors = require('cors');
const { logErrors, errorHandler, boomErrorHandler } = require('./middleware/error.handler');


const app = express();
const port = 3000;

const whiteList = ['http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}

app.use(express.json());
app.use(cors(options));
routeApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("mi port " + port)
});
