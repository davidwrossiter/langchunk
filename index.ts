#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { Command } = require("commander");
const program = new Command();

program
  .version("1.0.0")
  .arguments("<directory>")
  .description("Chunk JavaScript files in a directory")
  .action(async (directory: string) => {
    console.log(`Chunking files in directory: ${directory}`);
  });

program.parse(process.argv);
