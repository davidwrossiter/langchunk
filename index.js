#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { Command } = require("commander");
const program = new Command();

program
  .version("1.0.0")
  .arguments("<directory>")
  .description("Chunk JavaScript files in a directory")
  .action(async (directory) => {
    console.log(`Chunking files in directory: ${directory}`);
    const us = await processDirectory(directory);
    // console.log(us);
  });

program.parse(process.argv);

function processDirectory(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, { withFileTypes: true }, async (err, files) => {
      if (err) {
        console.error(`Error reading directory: ${err.message}`);
        reject(err);
        return;
      }

      const allChunks = [];
      for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
          const subDirChunks = await processDirectory(fullPath);
          allChunks.push(...subDirChunks);
        } else if (
          file.isFile() &&
          (file.name.endsWith(".js") || file.name.endsWith(".jsx"))
        ) {
          const fileChunks = await chunkFile(fullPath);
          allChunks.push(...fileChunks);
        }
      }
      resolve(allChunks);
    });
  });
}

function chunkFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading file: ${filePath}, ${err.message}`);
        reject(err);
        return;
      }

      const chunks = chunkData(data);
      console.log("DA CHUNK: ", chunks);
      // console.log(`File: ${filePath}, Chunks: ${chunks.length}`);
      resolve(chunks);
    });
  });
}

function chunkData(data) {
  // Dummy chunking function - replace with your actual logic
  const chunkSize = 1000; // Example chunk size
  const chunks = [];

  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }

  return chunks;
}
