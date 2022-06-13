const fs = require("fs")
const path = require("path")



const outputPath = path.join(__dirname, "../output")

//Delete and create folder
fs.mkdirSync(outputPath);
fs.mkdirSync(path.join(outputPath, "jsons"));
fs.mkdirSync(path.join(outputPath, "xlsx"));

const inputPath = path.join(__dirname, "../input")

//Delete and create folder
fs.mkdirSync(inputPath);
fs.mkdirSync(path.join(inputPath, "jsons"));
fs.mkdirSync(path.join(inputPath, "xlsx"));