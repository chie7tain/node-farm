const url = require("url");

const server = require("http")
  .createServer((req, res) => {
    console.log(req.url);
    res.end("hellow from node farm");
  })
  .listen(3000, "127.0.0.1", () => console.log("listening on port 3000"));
