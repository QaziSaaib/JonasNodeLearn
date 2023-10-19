const fs_obj = require("fs");
const http = require("http");
const url = require("url");

const { replaceTemplate } = require("./modules/mod1");

// console.log(fs_obj);

// console.log("Hello folks");
// console.log("File reading started...");

///////////////////////////////////////////////////////////////////////////////////
// In a synchronous Way of Reading and Writing files
// const textIn = fs_obj.readFileSync(`./txt/input.txt`, "utf-8");
// console.log(textIn);

// console.log("Other tasks...");

// const textOut = `This is what we know about the avocado ${textIn}.\n Created on ${new Date(
//   "10-11-2030"
// )}`;
// fs_obj.writeFileSync(`./txt/output.txt`, textOut);

///////////////////////////////////////////////////////////////////////////////////
// Asynchronous File reading and writing

// fs_obj.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) {
//     console.log(`❌ ${err}`);
//     return;
//   }
//   fs_obj.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs_obj.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       fs_obj.writeFile(
//         "./txt/final.txt",
//         `${data2}\n${data3}`,
//         "utf-8",
//         (err) => {
//           if (err) {
//             console.log(`Writing to the fail failed...❌`);
//           }
//         }
//       );
//     });
//   });
// });
// console.log("File reading started...");

///////////////////////////////////////////////////////////////////////////////////
// Using http module to create our local machine as a simple SERVER...

// const server = http.createServer((req, res) => {
//   res.end("Hello from the server");
// });

// server.listen(5000, "127.0.0.1", () => {
//   console.log("Our server is listening from the port 5000");
// });

// Routing
// const server = http.createServer((req, res) => {
//   const pathName = req.url;

//   if (pathName === "/" || pathName === "/overview") {
//     res.end("This is the Home Page");
//   } else if (pathName === "/products") {
//     res.end("This is the products page");
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//       "my-own-header": "hello world",
//     });
//     res.end("<h1>Page not available...Sorry</h1>");
//   }
// });

// server.listen(5000, "127.0.0.1", () => {
//   console.log("Our server is listening from the port 5000");
// });

///////////////////////////////////////////////////////////////////////////////////
// Building a simple API

// const server = http.createServer((req, res) => {
//   console.log(
//     "Executing this callback function, when request is send to our server"
//   );
//   res.end("Response from the server");
// });

// server.listen(5000, "127.0.0.1", () => {
//   console.log("Listening to the request (Local Host) from the port 5000");
// });

// const data = fs_obj.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// const dataObj = JSON.parse(data);
// // console.log(dataObj);

// const server = http.createServer((req, res) => {
//   const pathName = req.url;
//   if (pathName === "/" || pathName === "/home") {
//     res.end("Home page of the website");
//   } else if (pathName === "/products") {
//     res.end("Products page of the website");
//   } else if (pathName === "/api") {
//     // fs_obj.readFile(`./dev-data/data.json`, "utf-8", (err, result) => {
//     //   const data = JSON.parse(result);
//     //   console.log(data);
//     // });
//     // res.end("API");
//     res.writeHead(200, {
//       "Content-type": "application/json",
//     });
//     res.end(data);
//   } else {
//     res.writeHead(404, {
//       "Content-Type": "text/html",
//       "my-own-header": "hello world",
//     });
//     res.end("<h1>Page not found...404 error</h1>");
//   }
// });

// server.listen(5000, "127.0.0.1", () => {
//   console.log("Listening to the request (Local Host) from the port 5000");
// });

///////////////////////////////////////////////////////////////////////////////////
// HTML Templating

const dataJson = fs_obj.readFileSync(`${__dirname}/dev-data/data.json`);
const data = JSON.parse(dataJson);

// console.log(data);

const template_card = fs_obj.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const template_product = fs_obj.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const template_overview = fs_obj.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  if (pathname === "/" || pathname === "/overview") {
    const cards = data
      .map((product) => replaceTemplate(product, template_card))
      .join(" ");
    const overview = template_overview.replaceAll(`{%PRODUCT_CARDS%}`, cards);
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(overview);
  } else if (pathname === "/product") {
    const product = data[query.id];
    const product_template = replaceTemplate(product, template_product);
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(product_template);
  } else if (pathname === "/api") {
    res.end("API");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h2>Sorry page is not found!</h2>");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Listening to request from the port 5000");
});
