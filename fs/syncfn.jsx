const fs = require("fs");

const fileName = "test.txt";
// const writefile = fs.writeFileSync(
//   fileName,
//   "This is the initial data",
//   "utf-8",
// );

// fs.readFile("test.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// fs.writeFile("test.txt", "Hello World", (err, data) => {
//   if (err) throw err;
//   console.log("Data add");
// });

fs.unlink("test.txt", (err) => {
  if (err) throw err;

  console.log("File deleted");
});

// console.log(writefile);
