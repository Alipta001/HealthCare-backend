const path = require("path");
// console.log(__dirname);
// console.log(__filename);

// school folder/students/data.txt

const filepath = path.join("folder", "students", "data.txt");

const parseData = path.parse(filepath);
const resolveData = path.resolve(filepath);

const baseName = path.basename(filepath);
const extName = path.extname(filepath);
const dirname = path.dirname(filepath);
console.log({ parseData, resolveData, baseName, extName, dirname });
