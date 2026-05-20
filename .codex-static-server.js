const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT || 8787);
const root = process.cwd();
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

http
  .createServer((req, res) => {
    let pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (pathname === "/") pathname = "/hackathon.html";

    const file = path.resolve(root, `.${pathname}`);
    if (!file.startsWith(root)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(file, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      res.writeHead(200, {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
      });
      res.end(data);
    });
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`Listening on http://127.0.0.1:${port}/hackathon.html`);
  });
