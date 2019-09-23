const express = require(`express`);
const app = express();
const server = require(`http`).Server(app);
const bodyParser = require(`body-parser`);
const config = require(`./config.json`);

const IndexRoute = require(`./src/libs/IndexRoute`);
const Login = require(`./src/routes/Login`);
const Details = require(`./src/routes/Details`);

app.use(express.static(`${__dirname}/public`));
app.set(`view engine`, `ejs`);
app.set(`views`, `${__dirname}/views`);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(`/public`, (req, res) => {
    res
        .status(404)
        .send(`resource not found`);
});

app.all(`/`, IndexRoute);
app.post(`/login`, Login);

app.post(`/details`, Details);

server.listen(config.server.port);
console.log(`Listening on port: ${config.server.port}!`);