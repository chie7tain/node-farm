const url = require("url");
const fs = require("fs");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");

require("http")
  .createServer((req, res) => {
    const pathName = req.url;
    // Overview:

    if (pathName === "/" || pathName === "/overview") {

      res.end("over page");

      // Product:
    } else if (pathName === "/product") {
      res.end("product page");

      // API:
    } else if (pathName === "/api") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);

      // Not found:
    } else {
      res.writeHead(404, {
        "Content-type": "text/html",
        "my-own-header": "hello-world",
      });
      res.end("not found");
    }
  })
  .listen(3000, "127.0.0.1", () => console.log("listening on port 3000"));
