const express = require("express");
const history = require("connect-history-api-fallback");

const server = express();

server.use(history());
server.use("/", express.static(__dirname + "/dist"));

server.listen(2048, () => {
    console.log("[Log] Frontend server is running at http://127.0.0.1:2048.");
});

