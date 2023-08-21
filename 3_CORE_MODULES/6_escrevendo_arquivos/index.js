const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const url = require('url').parse(req.url, true);
    const name = url.query.name;

    if(!name){
        fs.readFile("index.html", function (err, data) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
           return res.end();
          });
    }else{
        fs.writeFile('arquivo.txt',name, function (err, data){
            res.writeHead(302, {
                Location: "/"
            });
            return res.end();
        })
    }

});

server.listen(3000, () => {
  console.log("Servidor Rodando na porta 3000");
});
