//Dependancies
const express = require("express");

// Import Data


//START WITH EXPRESS
const server = express();


//CUSTOME MILLEWHARE/HANDLE FUNCTIONS OR INPORTS OF
function logger(request, responce, next) {
  const { method, originalUrl } = request;
  console.log(`${method} to ${originalUrl} at ${Date(Date.now())}`);

  next();
}

//MIDDLE WARE
server.use(express.json());
server.use(logger);

//ROUTES
const userRouter = require('./routes/userRouter.js');

//ENDPOINTS
server.get('/', logger, (req, res) => {
  res.send(`<h2>GLOBAL SERVER UP ENDPOINT</h2>`);
});

server.use('/api', userRouter);


//LISTEN SERVER
const port = 8000;
server.listen(port, () => console.log((`\n ** api on: ${port} ** \n`)));
