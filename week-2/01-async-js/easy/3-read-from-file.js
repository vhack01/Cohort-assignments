const fs = require("fs");

// async task
fs.readFile("3-read-from-file.md", "utf-8", function (err, data) {
  console.log("data: " + data);
});

let a = 0;
for (let i = 0; i < 100000000000; i++) {
  a++;
}
console.log(a);
