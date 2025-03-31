const http = require("http");

const server = http.createServer((req, res) => {
  console.log("hello node.....");

  const path = req.url;
  console.log("Requested:", path);

  switch (path) {
    case "/":
      res.write("<h1 style='color:black; text-align:center;'>NEW PAGE</h1>");
      res.end();
      break;
    case "/home":
      res.write("<h1 style='color:gray; text-align:center;'>HOME</h1><p style='text-align:center;'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>");
      res.end();
      break;
    case "/about":
      res.write("<h1 style='color:red; text-align:center;'>ABOUT</h1><p style='text-align:center;'>It was popularised in the 1960s with the release of Letraset sheets</p>");
      res.end();
      break;
    case "/services":
      res.write(
        "<h1 style='color:black; text-align:center;'>SERVICES</h1><p style='text-align:center;'>sometimes by accident, sometimes on purpose (injected humour and the like).</p>"
      );
      res.end();
      break;
    case "/contact":
      res.write(
        "<h1 style='color:red; text-align:center;'>CONTACT</h1><p style='text-align:center;'>There are many variations of passages of Lorem Ipsum available, but the majority </p>"
      );
      res.end();
      break;
    default:
      res.write(
        "<h1 style='color:pink; text-align:center;'>404 - Page Not Found</h1><p style='text-align:center;'> Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>"
      );
      res.end();
  }
});

server.listen(9000, () =>
  console.log("SERVER IS RUN 9000")
);
