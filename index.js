const url = require("url");
const fs = require("fs");

const replaceTemplate = (temp, product) => {
  let output = temp.replace(`{%PRODUCTNAME%}`, product.productName);
  output = output.replace(`{%IMAGE%}`, product.image);
  output = output.replace(`{%PRICE%}`, product.price);
  output = output.replace(`{%FROM%}`, product.from);
  output = output.replace(`{%NUTRIENTS%}`, product.nutrients);
  output = output.replace(`{%QUANTITY%}`, product.quantity);
  output = output.replace(`{%DESCRIPTION%}`, product.description);
  output = output.replace(`{%ID%}`, product.id);
  if (!product.organic) {
    output = output.replace(`{%NOT_ORGANIC%}`, `not-organic`);
  }
  return output;
};

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
    const pathName = req.url;
    // Overview:

    if (pathName === "/" || pathName === "/overview") {
      res.writeHead(200, { "Content-type": "text/html" });

      const cardsHtml = dataObj
        .map((el) => replaceTemplate(tempCard, el))
        .join("");
      const output = tempOverview.replace(`{%PRODUCT_CARDS%}`, cardsHtml);

      res.end(output);

      // Product:
    } else if (pathName === "/product") {
      res.writeHead(200, { "Content-type": "text/html" });
      res.end(tempProduct);
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
