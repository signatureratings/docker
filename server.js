const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const session = require("express-session");
const redis = require("redis");

const { REDIS_URL, SESSION_SECRET, REDIS_PORT } = require("./config/config");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

connectDB();

//middlewares
app.use(express.json()); //make sure body is added to request
app.enable("trust proxy"); //enable trust proxy set by nginx
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 60000,
    },
  })
);

app.use("/api/v1/posts", require("./routes/postRoute"));
app.use("/api/v1/users", require("./routes/userRoute"));

app.get("/api/v1", (req, res) => {
  console.log("Yeah it ran...");
  res.status(200).send("<p>Hello world...</p>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening on the port:", port);
});
