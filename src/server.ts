import http from "http";

function startServer() {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Klyister is online 😎\n");
  });

  server.listen(8080);
}

export default startServer;
