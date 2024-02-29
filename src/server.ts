import * as http from "http";

function runServer() {
  http
    .createServer(function (req, res) {
      res.write("I'm alive Klyisifer 💪🍀!!");
      res.end();
    })
    .listen(8080);
  console.log("Server is running");
}

export default runServer;
