const express = require("express");
const history = require("connect-history-api-fallback");
const host = require("./host.js");

const server = express();

server.use(history());
server.use("/", express.static(__dirname + "/dist"));

server.listen(80, () => {
    console.log(`[Log] Frontend server is running at ${host}.`);
});

