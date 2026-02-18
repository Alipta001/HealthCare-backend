let http = require("http");

//web server

let server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write(" I am  Nill Bhai,I am a boy ");

    res.end();
  }

  if (req.url == "/home") {
    res.write(" I am  Nill Datta khan");

    res.end();
  }
});
let PORT = 3000;
server.listen(PORT, () => {
  console.log(`Listening on the PORT ${PORT}`);
});
