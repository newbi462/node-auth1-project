//Dependancies
const express = require("express");
const session = require("express-session"); // install
const KnexSessionStore = require("connect-session-knex")(session);// install

// Import Data
const db = require('./data/db.js');


//START WITH EXPRESS
const server = express();

const sessionConfig = {
  name: "fooBar",// what you want it called this is FOOBAR
  // secret is used for cookie encryption
  secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
  cookie: {
    maxAge: 1000 * 60 * 10, // 10 minutes in ms
    secure: false, // set to true in production, only send cookies over HTTPS
    httpOnly: true, // JS cannot access the cookies on the browser
  },
  resave: false,
  saveUninitialized: true, // read about it for GDPR compliance
  store: new KnexSessionStore({
    knex: db,//see above inport
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 60000,
  }),
};


//CUSTOME MILLEWHARE/HANDLE FUNCTIONS OR INPORTS OF
function logger(request, responce, next) {
  const { method, originalUrl } = request;
  console.log(`${method} to ${originalUrl} at ${Date(Date.now())}`);

  next();
}

//MIDDLE WARE
server.use(session(sessionConfig)); // turn on sessions // see above "const session" and "const sessionConfig = {"
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
