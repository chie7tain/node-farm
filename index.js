const url = require("url");
const fs = require("fs");
const replaceTemplate = require("./module/replaceTemplate");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

require("http")
  .createServer((req, res) => {
    const { query, pathname: pathName } = url.parse(req.url, true);

    // const pathName = req.url;
    // Overview:

    if (pathName === "/" || pathName === "/overview") {
      console.log(query);
      res.writeHead(200, { "Content-type": "text/html" });

      const cardsHtml = dataObj
        .map((el) => replaceTemplate(tempCard, el))
        .join("");
      const output = tempOverview.replace(`{%PRODUCT_CARDS%}`, cardsHtml);

      res.end(output);

      // Product:
    } else if (pathName === "/product") {
      const product = dataObj[query.id];

      const productTemplate = replaceTemplate(tempProduct, product);

      res.writeHead(200, { "Content-type": "text/html" });
      res.end(productTemplate);
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
