#!/usr/bin/env node
const esprima = require("esprima");
const estraverse = require("estraverse");

const fs = require("fs");
const { Command } = require("commander");
const program = new Command();
const path = require("path");

program
  .version("1.0.0")
  .arguments("<directory>")
  .description("Chunk JavaScript files in a directory")
  .action((directory) => {
    console.log(`Chunking files in directory ${directory}`);
    processDirectory(directory);
  });

program.parse(process.argv);

function processDirectory(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err.message}`);
      return;
    }

    files.forEach((file) => {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        processDirectory(fullPath);
      } else if (
        file.isFile() &&
        (file.name.endsWith(".js") || file.name.endsWith(".jsx"))
      ) {
        console.log(chunkFile(fullPath));
      }
    });
  });
}

function chunkFile(filePath) {
  // Read file contents
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${filePath}, ${err.message}`);
      return;
    }

    // Chunking logic goes here
    const chunks = extractCodeChunks(data);

    // Example: Print chunks to console (replace with actual storage logic)
    console.log(`File: ${filePath}, Chunks: ${chunks.length}`);
  });
}

function extractCodeChunks(sourceCode) {
  const ast = esprima.parseScript(sourceCode, { loc: true });
  const chunks = [];
  let firstChunkCollected = false;

  estraverse.traverse(ast, {
    enter: function (node, parent) {
      if (firstChunkCollected) {
        return estraverse.VisitorOption.Break;
      }
      if (
        node.type === "FunctionDeclaration" ||
        node.type === "ClassDeclaration" ||
        node.type === "VariableDeclaration" ||
        node.type === "ExpressionStatement"
      ) {
        const start = node.loc.start.line - 1;
        const end = node.loc.end.line;
        const chunk = sourceCode.split("\n").slice(start, end).join("\n");
        console.log("Chunk: ", chunk);
        chunks.push(chunk);
      }
    },
  });
  return chunks;
}
// const codeChunks = extractCodeChunks(ast, code);
// console.log(codeChunks);

const MAX_CHUNK_SIZE = 1000;

function adjustChunkSize(chunks) {
  const adjustedChunks = [];
  chunks.forEach((chunk) => {
    if (chunk.length > MAX_CHUNK_SIZE) {
      const subChunks = chunk.match(new RegExp(`.{1,${MAX_CHUNK_SIZE}}`, "g"));
      adjustedChunks.push(...subChunks);
    } else {
      adjustedChunks.push(chunk);
    }
  });
  return adjustedChunks;
}

// const finalChunks = adjustChunkSize(codeChunks);

function determineType(chunk) {
  // Implement this based on your needs
  return "Function";
}

function addMetadata(chunks) {
  return chunks.map((chunk, index) => ({
    id: index,
    content: chunk,
    type: determineType(chunk),
    position: index,
    length: chunk.length,
    filePath: fileName,
  }));
}

// const chunksWithMetadata = addMetadata(finalChunks);
// console.log(chunksWithMetadata);

// const vectorDatabase = require("vector-database-client");

// chunksWithMetadata.forEach((chunk) => {
//   vectorDatabase.insert(chunk);
// });
